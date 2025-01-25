# ChatBot-AI

Here are the **requirements** for a simple **predefined chatbot** using **Rasa Open Source** **without machine learning** (Rule-Based Chatbot). 🚀  

---

# **📌 Project Requirements: Rule-Based Chatbot using Rasa Open Source**

## **1️⃣ Project Overview**
Develop a **predefined (rule-based) chatbot** using **Rasa Open Source** that responds to user queries based on predefined intents and responses. The chatbot will not use machine learning but will rely on a rule-based approach.

---

## **2️⃣ Functional Requirements**
### ✅ **User Interactions**
- The chatbot should handle **greetings** (e.g., "Hello", "Hi").
- The chatbot should provide **basic FAQ responses** (e.g., "What is your name?", "How can I contact support?").
- The chatbot should handle **goodbye messages** (e.g., "Bye", "See you later").
- The chatbot should handle **fallback responses** when the user asks an unknown question.

### ✅ **Predefined Intents**
The chatbot should recognize and respond to the following **predefined intents**:  
1. **Greeting Intent** (`greet`) → Responds to "Hello", "Hi", etc.  
2. **Goodbye Intent** (`goodbye`) → Responds to "Bye", "See you".  
3. **FAQ Intent** (`faq`) → Responds to predefined FAQs.  
4. **Fallback Intent** (`nlu_fallback`) → Handles unknown questions.  

### ✅ **Predefined Responses**
- Example responses:
  - **Greet** → "Hello! How can I help you today?"
  - **Goodbye** → "Goodbye! Have a nice day!"
  - **FAQ Example** → "Rasa is an open-source chatbot framework."
  - **Fallback** → "I'm sorry, I don't understand. Can you rephrase that?"

---

## **3️⃣ Technical Requirements**
### ✅ **Development Environment**
- **Python 3.8+**
- **Rasa Open Source**
- **Command Line Interface (CLI)**
- **Text-based chatbot** (running in `rasa shell`)

### ✅ **Installation & Setup**
1. Install **Rasa Open Source**:
   ```bash
   pip install rasa
   ```
2. Initialize a **new Rasa project**:
   ```bash
   rasa init --no-prompt
   ```
3. Modify the necessary files to add **rule-based responses**.

---

## **4️⃣ Implementation Details**
### ✅ **Key Rasa Files**
1. **NLU Training Data (`data/nlu.yml`)**  
   Defines the **intents** and sample user inputs.
2. **Domain File (`domain.yml`)**  
   Defines **intents, responses, and actions**.
3. **Rules File (`data/rules.yml`)**  
   Defines **rule-based responses** (no ML training required).
4. **Configuration File (`config.yml`)**  
   Ensures **no machine learning is used**.
5. **Actions File (Optional, `actions.py`)**  
   Can be used for custom responses (not required for simple bots).

---

## **5️⃣ Example File Configurations**
### ✅ **`data/nlu.yml` (Define Intents)**
```yaml
nlu:
- intent: greet
  examples: |
    - hi
    - hello
    - hey
    - good morning
    - good evening

- intent: goodbye
  examples: |
    - bye
    - goodbye
    - see you later

- intent: faq
  examples: |
    - what is rasa?
    - how does rasa work?
    - how can I install rasa?

- intent: nlu_fallback
  examples: |
    - I want to order a pizza
    - Tell me a joke
```

---

### ✅ **`domain.yml` (Define Responses)**
```yaml
intents:
  - greet
  - goodbye
  - faq
  - nlu_fallback

responses:
  utter_greet:
    - text: "Hello! How can I help you today?"

  utter_goodbye:
    - text: "Goodbye! Have a nice day!"

  utter_faq:
    - text: "Rasa is an open-source chatbot framework."

  utter_default:
    - text: "I'm sorry, I don't understand. Can you rephrase that?"
```

---

### ✅ **`data/rules.yml` (Define Rule-Based Responses)**
```yaml
rules:
- rule: Greet User
  steps:
  - intent: greet
  - action: utter_greet

- rule: Say Goodbye
  steps:
  - intent: goodbye
  - action: utter_goodbye

- rule: Answer FAQ
  steps:
  - intent: faq
  - action: utter_faq

- rule: Fallback Response
  steps:
  - intent: nlu_fallback
  - action: utter_default
```

---

### ✅ **`config.yml` (Disable Machine Learning)**
```yaml
recipe: default.v1
language: en
pipeline: []  # No machine learning pipeline
policies:
  - name: RulePolicy
```

---

## **6️⃣ Running the Chatbot**
1. **Train the chatbot** (Only needed for validation):  
   ```bash
   rasa train
   ```
2. **Run the chatbot in shell mode**:  
   ```bash
   rasa shell
   ```
3. **Test it by typing messages like**:  
   - "Hi"
   - "What is Rasa?"
   - "Goodbye"
   - "Tell me a joke" (fallback response)

---

## **7️⃣ Deployment (Optional)**
- Deploy on **Docker, AWS, Google Cloud, or Heroku**.
- Integrate with **WhatsApp, Telegram, or Slack** via Rasa connectors.

---

## **8️⃣ Conclusion**
This chatbot is a **simple predefined chatbot using Rasa Open Source** with **no machine learning**. It works using **rules-based responses** for predefined intents.
