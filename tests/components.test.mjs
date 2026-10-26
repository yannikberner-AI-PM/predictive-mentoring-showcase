import assert from 'node:assert/strict';
import { test } from 'node:test';
import { decideRuntime } from '../components/src/services/llm/routing.ts';
import { templateSuggestion, templateChatReply } from '../components/src/services/llm/fallback.ts';
import { classifyHeuristic } from '../components/src/db/categories.ts';
import { classifyDataOwner } from '../components/src/db/dataOwnerPolicy.ts';

for (const preferredId of ['apple', 'android']) {
  test(`${preferredId}: available uses OS model`, () => {
    assert.deepEqual(decideRuntime({ preferredId, osState: 'available' }), {
      osState: 'available', usingLocalHelper: false, activeProviderId: preferredId,
    });
  });
  for (const osState of ['downloading', 'unsupported']) {
    test(`${preferredId}: ${osState} uses local helper and preserves readiness`, () => {
      assert.deepEqual(decideRuntime({ preferredId, osState }), {
        osState, usingLocalHelper: true, activeProviderId: 'local',
      });
    });
  }
}
test('forced local never claims OS readiness', () => {
  assert.deepEqual(decideRuntime({ preferredId: 'local', osState: 'available' }), {
    osState: 'unsupported', usingLocalHelper: true, activeProviderId: 'local',
  });
});
test('missing readiness fails to local', () => {
  assert.equal(decideRuntime({ preferredId: 'apple' }).activeProviderId, 'local');
});
test('cold-start template is reproducible and marks estimate', () => {
  const input = { goalTitle: 'Synthetisches Beispiel', probabilityPercent: 54.6, category: 'career', coldStart: true };
  const result = templateSuggestion(input);
  assert.equal(result, templateSuggestion(input));
  assert.match(result, /erste Schätzung/);
  assert.match(result, /55%/);
  assert.match(result, /15-Minuten-Fokusblock/);
});
test('downward trend selects gentle adaptation despite high number', () => {
  assert.match(templateSuggestion({ goalTitle: 'Test', probabilityPercent: 80, trend: 'down' }), /sanfter Impuls/);
});
test('low, middle and high template branches are distinct', () => {
  const render = p => templateSuggestion({ goalTitle: 'Test', probabilityPercent: p });
  assert.match(render(54), /sanfter Impuls/);
  assert.match(render(55), /kleiner Schritt/);
  assert.match(render(70), /guten Weg/);
});
test('nonfinite template input becomes zero; empty title gets default', () => {
  for (const p of [NaN, Infinity, -Infinity]) {
    const result = templateSuggestion({ goalTitle: ' ', probabilityPercent: p });
    assert.match(result, /0%/);
    assert.match(result, /dein Ziel/);
  }
});
test('chat template trims and truncates only the quoted input', () => {
  assert.match(templateChatReply(' '), /dein Anliegen/);
  assert.match(templateChatReply('x'.repeat(61)), new RegExp(`x{57}…`));
  assert.equal(templateChatReply(' Test '), templateChatReply('Test'));
});
test('category heuristic covers six domains and fixed rule precedence', () => {
  for (const [text, expected] of [['Yoga', 'health'], ['Budget', 'finance'], ['Familie', 'relationships'], ['Karriere', 'career'], ['Meditation', 'growth'], ['xyz', 'other'], ['Yoga Budget', 'health']]) {
    assert.equal(classifyHeuristic(text), expected);
  }
});
test('owner policy distinguishes empty, adopt, same and conflict', () => {
  assert.equal(classifyDataOwner(null, 'synthetic-a', false), 'initialize');
  assert.equal(classifyDataOwner(null, 'synthetic-a', true), 'adopt');
  assert.equal(classifyDataOwner('synthetic-a', 'synthetic-a', true), 'same');
  assert.equal(classifyDataOwner('synthetic-a', 'synthetic-b', false), 'conflict');
});
