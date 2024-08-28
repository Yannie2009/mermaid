import { imgSnapshotTest } from '../../helpers/util.ts';

const looks = ['classic', 'handDrawn'] as const;
const directions = ['TB', 'BT', 'LR', 'RL'] as const;
const newShapesSet1 = [
  'triangle',
  'slopedRect',
  'tiltedCylinder',
  'flippedTriangle',
  'hourglass',
] as const;
const newShapesSet2 = [
  'taggedRect',
  'multiRect',
  'lightningBolt',
  'filledCircle',
  'windowPane',
] as const;

const newShapesSet3 = [
  'halfRoundedRectangle',
  'curvedTrapezoid',
  'bowTieRect',
  'dividedRectangle',
  'crossedCircle',
] as const;

const newShapesSet4 = [
  'waveRectangle',
  'trapezoidalPentagon',
  'linedCylinder',
  'waveEdgedRectangle',
  'multiWaveEdgedRectangle',
] as const;

const newShapesSet5 = [
  'linedWaveEdgedRect',
  'taggedWaveEdgedRectangle',
  'text',
  'card',
  'shadedProcess',
] as const;

const newShapesSet6 = ['roundedRect', 'squareRect', 'stateStart', 'stateEnd', 'labelRect'] as const;

const newShapesSet7 = ['forkJoin', 'choice', 'note', 'stadium'] as const;

const newShapesSet8 = [
  'question',
  'hexagon',
  'curlyBraces',
  'multiRect',
  'waveEdgedRectangle',
] as const;

const newShapesSet9 = ['anchor', 'lean_right', 'lean_left', 'trapezoid', 'inv_trapezoid'] as const;

const newShapesSet10 = [
  'subroutine',
  'cylinder',
  'circle',
  'doublecircle',
  'rect_left_inv_arrow',
] as const;

// Aggregate all shape sets into a single array
const newShapesSets = [
  newShapesSet1,
  newShapesSet2,
  newShapesSet3,
  newShapesSet4,
  newShapesSet5,
  newShapesSet6,
  newShapesSet7,
  newShapesSet8,
  newShapesSet9,
  newShapesSet10,
] as const;

looks.forEach((look) => {
  directions.forEach((direction) => {
    newShapesSets.forEach((newShapesSet) => {
      describe(`Test ${newShapesSet.join(', ')} in ${look} look and dir ${direction}`, () => {
        it(`without label`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape} }@\n`;
          });
          imgSnapshotTest(flowchartCode, { look });
        });

        it(`with label`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape}, label: 'This is a label for ${newShape} shape' }@\n`;
          });
          imgSnapshotTest(flowchartCode, { look });
        });

        it(`connect all shapes with each other`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index}${index}@{ shape: ${newShape}, label: 'This is a label for ${newShape} shape' }@\n`;
          });
          for (let i = 0; i < newShapesSet.length; i++) {
            for (let j = i + 1; j < newShapesSet.length; j++) {
              flowchartCode += `  n${i}${i} --> n${j}${j}\n`;
            }
          }
          imgSnapshotTest(flowchartCode, { look });
        });

        it(`with very long label`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape}, label: 'This is a very very very very very long long long label for ${newShape} shape' }@\n`;
          });
          imgSnapshotTest(flowchartCode, { look });
        });

        it(`with markdown htmlLabels:true`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape}, label: 'This is **bold** </br>and <strong>strong</strong> for ${newShape} shape' }@\n`;
          });
          imgSnapshotTest(flowchartCode, { look });
        });

        it(`with markdown htmlLabels:false`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape}, label: 'This is **bold** </br>and <strong>strong</strong> for ${newShape} shape' }@\n`;
          });
          imgSnapshotTest(flowchartCode, {
            look,
            htmlLabels: false,
            flowchart: { htmlLabels: false },
          });
        });

        it(`with styles`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape}, label: 'new ${newShape} shape' }@\n`;
            flowchartCode += `  style n${index}${index} fill:#f9f,stroke:#333,stroke-width:4px \n`;
          });
          imgSnapshotTest(flowchartCode, { look });
        });

        it(`with classDef`, () => {
          let flowchartCode = `flowchart ${direction}\n`;
          flowchartCode += `  classDef customClazz fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5\n`;
          newShapesSet.forEach((newShape, index) => {
            flowchartCode += `  n${index} --> n${index}${index}@{ shape: ${newShape}, label: 'new ${newShape} shape' }@\n`;
            flowchartCode += `  n${index}${index}:::customClazz\n`;
          });
          imgSnapshotTest(flowchartCode, { look });
        });
      });
    });
  });
});