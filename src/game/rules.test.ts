import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampAffection,
  updateHeroAffection,
  getRealmForExp,
  shouldTriggerRuoyanLaw,
  executeDailyAction,
  resolveSpecialRescue,
  hasJadeSlipSignal,
  evaluateFormationPower,
  GameProgressState,
} from './rules';

const baseState: GameProgressState = {
  day: 31,
  timeIndex: 1, // 午時
  ap: 3,
  maxAp: 5,
  stones: 8520,
  cultivationExp: 150, // 築基後期
  daysWithoutMajorEvent: 1,
  ruleViolations: 400,
  affection: {
    rong: 65,
    lu: 58,
    su: 52,
    ye: 47,
  },
  cluesFound: ['clue_1'],
  currentLocation: 'taiqing',
};

test('clampAffection and updateHeroAffection clamp within 0..100', () => {
  assert.equal(clampAffection(120), 100);
  assert.equal(clampAffection(-15), 0);
  const updated = updateHeroAffection(baseState.affection, 'rong', 50);
  assert.equal(updated.rong, 100);
  const decreased = updateHeroAffection(baseState.affection, 'ye', -60);
  assert.equal(decreased.ye, 0);
});

test('getRealmForExp returns accurate cultivation realm across the 9 realms', () => {
  assert.equal(getRealmForExp(50).name, '煉氣');
  assert.equal(getRealmForExp(150).name, '築基');
  assert.equal(getRealmForExp(320).name, '金丹');
  assert.equal(getRealmForExp(4500).name, '渡劫');
});

test('executeDailyAction consumes AP, advances time, and awards stones/exp', () => {
  const res = executeDailyAction(baseState, '修煉');
  assert.equal(res.ap, 2);
  assert.equal(res.timePeriod, '申時');
  assert.equal(res.cultivationExp, 178);
});

test('executeDailyAction rest restores full AP, increments day, and triggers Ruoyan Law after 3 quiet days', () => {
  const quietState: GameProgressState = {
    ...baseState,
    daysWithoutMajorEvent: 2,
    ap: 0,
  };
  const res = executeDailyAction(quietState, '休息');
  assert.equal(res.day, 32);
  assert.equal(res.ap, 5);
  assert.equal(res.ruoyanLawTriggered, true);
  assert.equal(res.daysWithoutMajorEvent, 0);
  assert.equal(shouldTriggerRuoyanLaw(3), true);
  assert.equal(shouldTriggerRuoyanLaw(2), false);
});

test('resolveSpecialRescue picks location-matched rescuer or Shura rescue', () => {
  const lowAffection = { rong: 20, lu: 30, su: 20, ye: 10 };
  const fanyinRescue = resolveSpecialRescue('fanyin', lowAffection);
  assert.equal(fanyinRescue.primaryRescuer, '葉聽禪');
  assert.equal(fanyinRescue.isShuraRescue, false);

  const highAffection = { rong: 75, lu: 70, su: 62, ye: 40 };
  const shuraRescue = resolveSpecialRescue('taiqing', highAffection);
  assert.equal(shuraRescue.isShuraRescue, true);
});

test('hasJadeSlipSignal and evaluateFormationPower work deterministically', () => {
  assert.equal(hasJadeSlipSignal('taiqing'), true);
  assert.equal(hasJadeSlipSignal('blackmarket'), false);

  const winResult = evaluateFormationPower([0, 2, 4], [0, 2, 4]);
  assert.equal(winResult.success, true);
  assert.equal(winResult.accuracy, 100);
  assert.equal(winResult.trappedHours, 3);
});
