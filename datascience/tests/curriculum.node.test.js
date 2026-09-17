import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { CURRICULUM_AXES, getAxisById, getChapterById } from '../src/data/curriculum.js';
import { LAB_REGISTRY, getLabById } from '../src/labs/registry.js';

describe('Currículo Canônico (curriculum.js)', () => {
  test('deve conter exatamente os 10 Eixos Canônicos', () => {
    assert.equal(CURRICULUM_AXES.length, 10);
    CURRICULUM_AXES.forEach((axis, idx) => {
      assert.equal(axis.number, idx + 1);
      assert.ok(axis.title.length > 5);
      assert.ok(Array.isArray(axis.chapters));
      assert.ok(axis.chapters.length >= 3);
    });
  });

  test('deve recuperar eixos por id ou número', () => {
    const axis1 = getAxisById('axis-1');
    assert.ok(axis1);
    assert.equal(axis1.number, 1);
    assert.equal(axis1.slug, 'fundamentos');

    const axis6 = getAxisById('6');
    assert.ok(axis6);
    assert.equal(axis6.title, 'Aprendizado de Máquina (Machine Learning)');
  });

  test('deve conter o Capítulo Piloto Benchmark com laboratório associado', () => {
    const found = getChapterById('axis-1-cap-3-clt');
    assert.ok(found);
    assert.equal(found.chapter.status, 'pilot');
    assert.equal(found.chapter.hasLab, true);
    assert.equal(found.chapter.labId, 'clt-lab');
  });
});

describe('Registro Central de Laboratórios (registry.js)', () => {
  test('deve conter laboratórios com renderizador e metadados válidos', () => {
    assert.ok(LAB_REGISTRY.length >= 8);
    LAB_REGISTRY.forEach(lab => {
      assert.ok(lab.id);
      assert.ok(lab.name);
      assert.ok(lab.axisId);
      assert.ok(lab.chapterId);
      assert.equal(typeof lab.render, 'function');
    });
  });

  test('deve recuperar o laboratório clt-lab', () => {
    const clt = getLabById('clt-lab');
    assert.ok(clt);
    assert.equal(clt.id, 'clt-lab');
    assert.equal(clt.axisId, 'axis-1');
  });
});
