/* Esmalte claro: remove a textura cinza, preservando a geometria fornecida. */
export function brightenTooth(viewer) {
  for (const material of viewer.model.materials) {
    const pbr = material.pbrMetallicRoughness;
    pbr.baseColorTexture.setTexture(null);
    pbr.metallicRoughnessTexture.setTexture(null);
    pbr.setBaseColorFactor([.95, .94, .92, 1]);
    pbr.setMetallicFactor(0);
    pbr.setRoughnessFactor(.32);
  }
}
