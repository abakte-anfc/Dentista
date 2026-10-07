import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, flatten, join, weld, simplify, prune, textureCompress, meshopt } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';
import fs from 'node:fs';

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
const document = await io.read('model/tooth 3d model.glb');
await document.transform(dedup(), flatten(), join(), weld(), simplify({ simplifier: MeshoptSimplifier, ratio: 0.025, error: 0.005 }), prune(), textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [512, 512] }), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
fs.mkdirSync('assets/3d', { recursive: true });
await io.write('assets/3d/dente.glb', document);
console.log(`Modelo otimizado: ${fs.statSync('assets/3d/dente.glb').size} bytes.`);
