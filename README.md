**RFM.ipynb:**
Contains the implementation of the baseline Random Forest model using a random train–test split.

**RFModi.ipynb:**
Implements the spatially validated Random Forest model using regional train–test splitting. This represents the recommended model in this study.

**DecisionTree.ipynb:**
Contains the implementation of the Decision Tree classifier used for comparative analysis.

**LogisticRegression.ipynb:**
Implements the Logistic Regression model used as a baseline to evaluate linear model performance.

**PREDD.ipynb:**
Demonstration notebook showing how the trained model is applied to new datasets to generate suitability predictions and maps.

**suitability_model_spatial.pkl:**
Trained Random Forest model (spatially validated). This is the primary model for deployment and prediction.

**decision_tree_model_spatial.pkl:**
Trained Decision Tree model for comparative prediction.

**suitability_model(Random).zip**
Trained Random Forest model (Randomly split).

**gee_hybrid_power_Data.js:**
Google Earth Engine (GEE) script used for dataset preprocessing, overlay analysis, and sample point extraction.

**README.md:**
Documentation describing the project structure and usage instructions



**How to Use the Model**

The trained model can be applied to new datasets in both tabular and raster formats. The workflow as demonstrated in PREDD.ipynb provides a complete example of how to generate predictions.

**Option 1:** Using Tabular Data (CSV)
**Prepare a dataset containing the required input variables:**
GHI
Wind
Elevation
LULC
Distance to road
Distance to railway
Distance to transmission lines

**Ensure that:**
Variable names match those used during training
Units and preprocessing are consistent (30m Resolution)

**Load the model and make predictions:**
import joblib
model = joblib.load("suitability_model_spatial.pkl")
predictions = model.predict(X)

**Option 2: Generating Suitability Maps (Raster-Based Prediction)**

For geospatial applications, the model can be applied to a multiband raster dataset, where each band represents one predictor variable.

Requirements:
Input raster must contain 7 bands in the following order:
GHI
Distance to railway
Distance to road
Distance to transmission lines
Elevation
LULC
Wind

**Workflow:**
Load the trained model
Read the multiband raster
Process the raster in chunks (for memory efficiency, if your system is not efficient)
Predict suitability for each pixel
Export the result as a GeoTIFF

This process is fully implemented in PREDD.ipynb, which demonstrates how to generate the suitability maps used in this study.
