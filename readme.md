# Sehat Saathi

Sehat Saathi is an AI-powered healthcare assistant designed to streamline interactions between doctors, patients, and administrators. This innovative platform addresses challenges such as lengthy waiting times, system inefficiencies, and risks associated with misdiagnosis or harmful drug interactions. By leveraging advanced AI models, Sehat Saathi transforms the healthcare experience for all stakeholders.

---

## 🚀 Features

### 1. **AI-Powered Disease Prediction**
- Utilizes the LLAMA AI model to predict diseases based on patient symptoms and medical history.
- Assists doctors by providing accurate and fast initial diagnosis suggestions, reducing manual analysis time.

### 2. **Drug Conflict Detection**
- Analyzes prescribed medications for potential drug interactions or harmful side effects.
- Alerts doctors about conflicts and suggests alternative medications to ensure patient safety.

### 3. **Efficient Patient Data Management**
- Maintains comprehensive patient records, including medical history, reports, and ongoing treatments.
- Combines past and current data for more informed diagnoses and treatment plans.

### 4. **Support for Critical Disease Detection**
- Enables early identification of severe diseases like cervical cancer, breast cancer, and tuberculosis.
- Improves patient outcomes by enabling timely intervention.

### 5. **Time Efficiency**
- Automates parts of the diagnosis process, allowing doctors to focus on advanced decision-making.
- Significantly reduces waiting times for patients.

---

## 👥 Stakeholders

### 1. **Doctors**
- Verify AI-predicted diseases and provide expertise-driven diagnoses.
- Prescribe medications with AI-assisted drug conflict resolution.
- Benefit from reduced manual workload and enhanced diagnostic accuracy.

### 2. **Patients**
#### New Patients
- Register by providing personal details, symptoms, and uploading relevant images (e.g., scans or photos).

#### Existing Patients
- Update symptoms and access past medical records seamlessly.
- Benefit from AI-enhanced analysis that integrates historical and current data for accurate treatment.

### 3. **Administrators**
- Manage backend operations to ensure data integrity and system functionality.
- Oversee the smooth execution of workflows for doctors and patients.

---

## 📋 Workflow

### For New Patients:
1. **Registration**: Patients enter personal details, symptoms, and upload relevant medical images.
2. **Prediction**: The AI model generates possible diagnoses based on the input data.
3. **Doctor’s Input**: Doctors review the AI’s predictions, confirm diagnoses, and prescribe treatments.
4. **Conflict Resolution**: If the system detects drug conflicts, it recommends safe alternatives.

### For Existing Patients:
1. **Data Retrieval**: The system retrieves the patient’s medical history and past reports.
2. **Analysis**: AI combines historical data with new symptoms to provide diagnostic suggestions.
3. **Doctor’s Verification**: Doctors adjust treatment plans and prescriptions based on AI recommendations and drug conflict checks.

---

## 🛠️ Core Components

### 1. **Frontend**
- Developed using **ReactJS** to ensure a seamless and responsive user experience.

### 2. **Backend**
- Built with **Express.js**, providing a robust and scalable server-side framework.

### 3. **Database**
- Utilizes **MongoDB** to securely store patient data and enable efficient retrieval for analysis.

### 4. **AI Model (LLAMA)**
- Powers disease prediction by analyzing patient data.
- Enhances diagnostic accuracy with advanced natural language processing and medical knowledge integration.

### 5. **Conflict Detection Module**
- Monitors prescribed medications for interactions and adverse effects.
- Suggests alternative treatments to maintain patient safety.

---

## 💡 Benefits

- **Faster Diagnoses**: Reduces the time needed for initial analysis, improving overall efficiency.
- **Patient Safety**: Minimizes risks associated with harmful drug interactions.
- **Streamlined Workflows**: Enhances coordination among doctors, patients, and administrators.
- **Improved Outcomes**: Supports early detection of critical diseases, leading to better patient care.
- **Time Savings**: Frees up doctors to focus on complex cases while routine analysis is automated.


---

## 🔮 Flowchart

1. **Patient and Admin Flowchart**:

![patient_Admin](./lnm_images/pd.png)

2. **Doctor Flowchart**:

![Doctor](./lnm_images/doc.png)

---

## 🔮 ER Diagram

![ER Diagram](./lnm_images/ER.png)

---

## 🔮 Screeshots

1. **Admin**:

![Registration](./lnm_images/a22.jpeg)
<br />

![Dashboard](./lnm_images/a3.jpeg)
 <br />
 
![Patient_profile](./lnm_images/d4.jpeg)
 <br />
 
![Patient_History](./lnm_images/a9.jpeg)
 <br />
 
![Doctor_profile](./lnm_images/a2.jpeg)
 <br />
 
![Dashboard_Preview](./lnm_images/p1.jpeg)
 <br />
 
2. **Patient**:

![Registration](./lnm_images/p23.jpeg)

![Registration1](./lnm_images/p18.jpeg)

![Registration2](./lnm_images/p20.jpeg)

![Dashboard](./lnm_images/p7.jpeg)

![Dashboard_Preview](./lnm_images/p19.jpeg)

![Report](./lnm_images/p24.jpeg)

![Patient_History](./lnm_images/p25.jpeg)

![Patient_History_preview](./lnm_images/p16.jpeg)

![Patient_profile](./lnm_images/p10.jpeg)

3. **Doctor**:
![Report](./lnm_images/d21.jpeg)

![Registration1](./lnm_images/d13.jpeg)

![New_diagnosis](./lnm_images/d14.jpeg)

![Dashboard_Preview](./lnm_images/d17.jpeg)

![Patient_History](./lnm_images/d26.jpeg)

![Report](./lnm_images/d8.jpeg)

![Doctor_profile](./lnm_images/d12.jpeg)

4. **Model Image**

![Disease_predictor](./lnm_images/m1.jpg)

![Disease_predictor_with_image](./lnm_images/m2.jpg)

---

## 🔮 Future Advancements

1. **Integration with Wearable Devices**:
   - Collect real-time health data such as heart rate, blood pressure, and glucose levels.
   - Enable continuous monitoring and predictive analysis.

2. **Telemedicine Features**:
   - Facilitate remote consultations with integrated video and chat functionalities.
   - Provide real-time access to patient data during virtual appointments.

3. **Multi-Language Support**:
   - Extend accessibility to non-English speaking users with multilingual interfaces.
   - Improve inclusivity in regions with diverse linguistic needs.

4. **Enhanced AI Models**:
   - Incorporate advanced machine learning algorithms for more accurate predictions.
   - Enable customization for region-specific diseases and treatment protocols.

5. **Blockchain for Data Security**:
   - Implement blockchain technology to ensure secure and tamper-proof patient records.
   - Provide patients with greater control over their data.

6. **Deep Learning Models for Enhanced Diagnosis and Prediction**:
   - Leverage deep learning techniques to improve the accuracy and precision of medical diagnoses.
   - Expand and diversify datasets for more robust model training, allowing the AI to handle a wider variety of conditions and improve prediction capabilities.
 
 7. **Integration of Drug Interaction Component**:
   - Incorporate a specialized module that analyzes drug interactions to reduce the risk of adverse effects and optimize treatment regimens.
   - Ensure real-time updates on drug interactions as new medications and research emerge.

 8. **Expansion of AI Agents for Diverse Disease Analysis**:
   - Add more AI agents tailored for specific diseases, enabling the system to offer targeted insights and approaches for a wider range of medical conditions.
   - Provide healthcare providers with specialized tools for more effective diagnosis and personalized treatment strategies.

---


## 💡 Challenges

1. **Timing of Doctor-Patient Interaction**:
   - **Challenge**: Determining an optimal interaction time for each doctor-patient session to ensure it's neither too short to overlook important details nor too long to reduce efficiency.
   - **Impact**: Ineffective consultations or delays in treating other patients.
   - **Solution**: Use historical data to analyze average interaction times for similar cases and optimize scheduling without compromising patient care quality.

2. **Drug Interaction Complexity**:
   - **Challenge:** Checking for interactions among multiple drugs prescribed to a patient can be complex, especially with rare or new drug combinations.
   - **Impact:** The system might miss certain interactions or generate false positives.
   - **Solution**: Use comprehensive drug databases and keep them updated regularly.
     
3. **Integration Across Stakeholders**:
   - **Challenge**: Ensuring seamless communication between doctors, patients, and the AI system.
   - **Impact**: Delays in diagnosis or treatment if different components don’t sync properly
   - **Solution**: Use standardized APIs and protocols for smooth integration.

     
---

## 📚 Summary

Sehat Saathi integrates cutting-edge AI technology with medical expertise to revolutionize healthcare delivery. By automating parts of the diagnosis process, ensuring medication safety, and facilitating efficient data management, it enhances patient care and reduces system inefficiencies. With its ability to predict diseases, detect drug conflicts, and pre-identify severe conditions, Sehat Saathi empowers doctors and patients alike, paving the way for a safer, faster, and more reliable healthcare system.

---

## 👨‍💻 Developers

- **Rajat Jain**
- **Nar Narayan Gaur**
- **Yash Kansara**
- **Pankaj Kumar**

