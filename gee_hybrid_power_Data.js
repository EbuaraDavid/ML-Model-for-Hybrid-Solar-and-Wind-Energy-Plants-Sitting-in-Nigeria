// Load assets
var Dist_to_railway = ee.Image("projects/ee-ebuaradavidd/assets/Dist_to_railway"),
    Dist_to_road = ee.Image("projects/ee-ebuaradavidd/assets/Dist_to_road"),
    Dist_to_tyranss = ee.Image("projects/ee-ebuaradavidd/assets/Dist_to_tyranss"),
    GHI = ee.Image("projects/ee-ebuaradavidd/assets/Nigeria_GHI_Clipped"),
    Wind = ee.Image("projects/ee-ebuaradavidd/assets/wind_mosaic_clipped_to_Nigeria"),
    LULC = ee.Image("projects/ee-ebuaradavidd/assets/LULC2024_Recompressed"),
    Elevation = ee.Image("projects/ee-ebuaradavidd/assets/Elevation_clipped_to_Nigeria"),
    RiverFinal = ee.Image("projects/ee-ebuaradavidd/assets/River_final"),
    Nig = ee.FeatureCollection("projects/ee-ebuaradavidd/assets/NGA_adm0");

// Visualization parameters
var windVis = {min: 2, max: 8, palette: ['white', 'blue']};
var elevationVis = {min: 0, max: 2000, palette: ['green', 'yellow', 'brown']};
var GHIVis = {min: 2, max: 7, palette: ['white', 'orange', 'red']};
var roadsVis = {min: 0, max: 10000, palette: ['#ffb300', '#ffca28', '#ffe082', '#fff9c4']};
var lulcVis = {
  min: 0,
  max: 11,
  palette: [
    '#1E90FF', '#228B22', '#32CD32', '#FFFF00',
    '#FF0000', '#D2B48C', '#FFFFFF', '#C0C0C0', '#DAA520'
  ]
};
var distVis = {
  min: 0,
  max: 50000,
  palette: ['white', 'blue', 'purple']
};
var riverVis = {
  min: 0,
  max: 69405,
  palette: ['white', 'cyan', 'blue', 'navy']
};

// Center map
Map.setCenter(8.6753, 9.0820, 6);

// Add layers to map
Map.addLayer(Wind, windVis, 'Wind Speed');
Map.addLayer(Elevation, elevationVis, 'Elevation');
Map.addLayer(GHI, GHIVis, 'GHI');
Map.addLayer(Dist_to_road, distVis, 'Distance to Roads');
Map.addLayer(Dist_to_tyranss, distVis, 'Distance to Transmission');
Map.addLayer(Dist_to_railway, distVis, 'Distance to Railway');
Map.addLayer(LULC, lulcVis, 'Land Cover');
Map.addLayer(RiverFinal, riverVis, 'Distance to River');

// --- PROJECTION SETTINGS ---
var targetCRS = 'EPSG:32632';  // Projected (UTM Zone 32N for Nigeria)
var targetScale = 30;  // 30 meters

function reprojectImage(image, isCategorical) {
  return isCategorical
    ? image.reproject({ crs: targetCRS, scale: targetScale })  // nearest-neighbor
    : image.resample('bilinear').reproject({ crs: targetCRS, scale: targetScale });
}

// Reproject all images
var Dist_to_railway_proj = reprojectImage(Dist_to_railway, false);
var Dist_to_road_proj = reprojectImage(Dist_to_road, false);
var Dist_to_tyranss_proj = reprojectImage(Dist_to_tyranss, false);
var Wind_proj = reprojectImage(Wind, false);
var Elevation_proj = reprojectImage(Elevation, false);
var GHI_proj = reprojectImage(GHI, false);
var LULC_proj = reprojectImage(LULC, true);  // categorical
var RiverFinal_proj = reprojectImage(RiverFinal, false);

// Combine bands into one image (cast all to float)
var combinedImage = ee.Image.cat([
  Dist_to_railway_proj.toFloat().rename('Dist_to_railway'),
  Dist_to_road_proj.toFloat().rename('Dist_to_road'),
  Dist_to_tyranss_proj.toFloat().rename('Dist_to_tyranss'),
  Wind_proj.toFloat().rename('Wind'),
  Elevation_proj.toFloat().rename('Elevation'),
  GHI_proj.toFloat().rename('GHI'),
  LULC_proj.toFloat().rename('LULC'),
  RiverFinal_proj.toFloat().rename('River_Dist')
]);

// Random sampling
var samplePoints = combinedImage.sample({
  region: Nig.geometry(),
  scale: targetScale,
  numPixels: 30000,
  geometries: true
});

/* Export to Drive
Export.table.toDrive({
  collection: samplePoints,
  description: 'Hybrid_Energy_Site_Samples_PCS_30m',
  fileFormat: 'CSV'
});*/

Export.image.toDrive({
  image: combinedImage,
  description: 'Hybrid_Energy_Composite_PCS_30m',
  folder: 'GEE_Exports',
  fileNamePrefix: 'Hybrid_Energy_Composite_PCS_30m',
  region: Nig.geometry(),
  scale: targetScale,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});
