from flask import Flask, render_template, request, jsonify
import ast
from symptomAnalysis import symptomExtractor, arrange_symptoms, format_symptoms, predictDiseaseFromSymptoms, giveDiet
import tensorflow as tf
from tensorflow import keras
import keras.preprocessing.image as image
from tensorflow.keras.utils import load_img, img_to_array

# from flask import Flask, render_template, request
# import predict  # Import your prediction logic

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get input symptoms from the form
        symptoms_input = request.form.get('symptoms')
        
        # Extract symptoms using the function from predict.py
        extracted_symptoms = symptomExtractor(symptoms_input)
        symptoms_list = ast.literal_eval(extracted_symptoms)
        
        # Symptom categories (replace with your actual lists)
        lt = [
            ['skin_rash', 'itching', 'continuous_sneezing', 'shivering', 'stomach_pain', 'acidity', 'vomiting', 'indigestion', 'muscle_wasting', 'patches_in_throat', 'fatigue', 'weight_loss', 'sunken_eyes', 'cough', 'headache', 'chest_pain', 'back_pain', 'weakness_in_limbs', 'chills', 'joint_pain', 'yellowish_skin', 'constipation', 'pain_during_bowel_movements', 'breathlessness', 'cramps', 'weight_gain', 'mood_swings', 'neck_pain', 'muscle_weakness', 'stiff_neck', 'pus_filled_pimples', 'burning_micturition', 'bladder_discomfort', 'high_fever'],
            ['nodal_skin_eruptions', 'skin_rash', 'shivering', 'chills', 'acidity', 'ulcers_on_tongue', 'vomiting', 'yellowish_skin', 'stomach_pain', 'loss_of_appetite', 'indigestion', 'patches_in_throat', 'high_fever', 'weight_loss', 'restlessness', 'sunken_eyes', 'dehydration', 'cough', 'chest_pain', 'dizziness', 'headache', 'weakness_in_limbs', 'neck_pain', 'weakness_of_one_body_side', 'fatigue', 'joint_pain', 'lethargy', 'nausea', 'abdominal_pain', 'pain_during_bowel_movements', 'pain_in_anal_region', 'breathlessness', 'sweating', 'cramps', 'bruising', 'weight_gain', 'cold_hands_and_feets', 'mood_swings', 'anxiety', 'knee_pain', 'stiff_neck', 'swelling_joints', 'pus_filled_pimples', 'blackheads', 'bladder_discomfort', 'foul_smell_of urine', 'skin_peeling', 'blister'],
            ['dischromic _patches', 'nodal_skin_eruptions', 'chills', 'watering_from_eyes', 'ulcers_on_tongue', 'vomiting', 'yellowish_skin', 'nausea', 'stomach_pain', 'burning_micturition', 'abdominal_pain', 'loss_of_appetite', 'high_fever', 'extra_marital_contacts', 'restlessness', 'lethargy', 'dehydration', 'diarrhoea', 'breathlessness', 'dizziness', 'loss_of_balance', 'headache', 'blurred_and_distorted_vision', 'neck_pain', 'weakness_of_one_body_side', 'altered_sensorium', 'fatigue', 'weight_loss', 'sweating', 'joint_pain', 'dark_urine', 'swelling_of_stomach', 'cough', 'pain_in_anal_region', 'bloody_stool', 'chest_pain', 'bruising', 'obesity', 'cold_hands_and_feets', 'mood_swings', 'anxiety', 'knee_pain', 'hip_joint_pain', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'blackheads', 'scurring', 'foul_smell_of urine', 'continuous_feel_of_urine', 'skin_peeling', 'silver_like_dusting', 'blister', 'red_sore_around_nose'],
            ['unknown', 'dischromic _patches', 'watering_from_eyes', 'vomiting', 'cough', 'nausea', 'loss_of_appetite', 'burning_micturition', 'spotting_ urination', 'passage_of_gases', 'abdominal_pain', 'extra_marital_contacts', 'lethargy', 'irregular_sugar_level', 'diarrhoea', 'breathlessness', 'family_history', 'loss_of_balance', 'lack_of_concentration', 'blurred_and_distorted_vision', 'excessive_hunger', 'dizziness', 'altered_sensorium', 'weight_loss', 'high_fever', 'sweating', 'headache', 'fatigue', 'dark_urine', 'yellowish_skin', 'yellowing_of_eyes', 'swelling_of_stomach', 'distention_of_abdomen', 'bloody_stool', 'irritation_in_anus', 'chest_pain', 'obesity', 'swollen_legs', 'mood_swings', 'restlessness', 'hip_joint_pain', 'swelling_joints', 'movement_stiffness', 'painful_walking', 'spinning_movements', 'scurring', 'continuous_feel_of_urine', 'silver_like_dusting', 'small_dents_in_nails', 'red_sore_around_nose', 'yellow_crust_ooze']
        ]

        # Arrange symptoms
        arranged_symptoms = arrange_symptoms(symptoms_list, lt)
        formatted_input = format_symptoms(arranged_symptoms)
        
        # Predict disease
        predicted_disease = predictDiseaseFromSymptoms(formatted_input)

        #give diet
        # d = d.strip()
        d = giveDiet(predicted_disease.strip())
        print(f"diet = {d}")
        #formatting list of diets
        d = ast.literal_eval(d)
        diet_list = ''
        for i in d:
            diet_list += i + ', '

        img_class = ''

         # Image upload and analysis (assuming a single image upload)
        if 'image' in request.files:
            uploaded_file = request.files['image']
            image_bytes = uploaded_file.read()
            image = tf.image.decode_jpeg(image_bytes, channels=3)
            target_size = (224,224)
            resized_image = tf.image.resize(image, target_size)
            img1 = img_to_array(resized_image)
            img1 = img1.reshape(1, 224, 224, 3)
            img1 = img1 / 255.0 
            model = keras.models.load_model('cataractClassifier.keras')
            result = model.predict(img1)
            threshold = 0.5
            predicted_class = (result >= threshold).astype(int)[0][0]
            if(predicted_class == 0):
                img_class = 'Cataract'
            else:
                img_class = 'Normal'
        

            
        
        # return jsonify({"disease": predicted_disease, "symptoms": arranged_symptoms, "diet":d})
        return jsonify({"disease": predicted_disease, "symptoms": arranged_symptoms, "diet": diet_list, "image_class":img_class})
    


if __name__ == '__main__':
    app.run(debug=True)