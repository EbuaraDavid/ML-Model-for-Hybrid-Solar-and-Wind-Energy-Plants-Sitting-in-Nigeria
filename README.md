1. **hybrid_model copy.ipynb**

This Jupyter Notebook contains the main modelling workflow, including:

Manual weighting of the technical, environmental, and infrastructural criteria

Development of the multi-criteria decision model

Training and evaluation of the Random Forest classifier

Generation of suitability scores and final class labels

It serves as the core notebook for the hybrid suitability modelling process.


**2. PREDD.ipynb**

This notebook focuses on model deployment and prediction. It includes:

Loading and applying the saved Random Forest model

Running predictions on preprocessed raster layers

Generating suitability outputs using the trained classifier

It is primarily used for inference once the model has been trained.


**3. gee_hybrid_power_Data.js**

This is the Google Earth Engine (GEE) script used for the geospatial data preparation stage. It contains:

Overlay and harmonisation of all input datasets

Random point generation for training sample extraction

Visualization of all layers to confirm alignment and preprocessing quality

It represents the full GEE workflow for generating training data and preparing the composite image used in the ML pipeline.
