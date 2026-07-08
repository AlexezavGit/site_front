**Тех. сценарій демонстрації FeeL Again** 

Для партнерів з розробки 

### **Версія 1.0 | Жовтень 2025**

---

## **🎯 МЕТА ДЕМО**

**Показати технічну готовність платформи FEEL Again вирішувати конкретні болючі точки MHPSS:**

1. **Координація організацій**  
2. **Автоматизація mhGAP звітності**  
3. **Дедуплікація бенефіціарів**  
4. **Real-time моніторинг послуг**  
5. **Інтеграція з українськими державними системами**

---

## **📋 СТРУКТУРА ДЕМО (30 хвилин)**

### **БЛОК 1: DASHBOARD КООРДИНАЦІЇ (7 хвилин)**

#### **1.1 Національний огляд даних (2 хв) open data as is**

**URL: [`coordination.feelagain.me`](http://coordination.feelagain.me)** 

**Що показати:**

**javascript**

```javascript
// Real-time метрики на головному екрані
{
  "active_organizations": 450-500,
  "active_sessions_now": 1,847,
  "monthly_beneficiaries": 23,451,
  "deduplication_prevented": 3,892,
  "average_response_time": "4.2 hours",
  "coverage_oblasts": "24/24"
}
```

**Візуальні елементи:**

* **Heat map України з концентрацією послуг по областях**  
* **Live ticker з поточними сесіями (анонімізовані)**  
* **Графік навантаження по годинах доби**  
* **Алерти про критичні ситуації (червоні зони)**

**Talking points:**

* **"Це реальні дані з 450-500 організацій, які вже в системі"**  
* **"Кожна точка на карті \- це активна сесія прямо зараз"**  
* **"Система автоматично виявляє gap'и в покритті"**

#### **1.2 Регіональний хаб (2 хв)**

**URL: [`coordination.regional.kharkiv.feelagain.me`](http://dashboard.feelagain.me/twg/)**

**Інтерактивні функції:**

**python**

```py
# Фільтри для демонстрації
filters = {
    "service_type": ["individual_therapy", "group_therapy", "crisis_intervention"],
    "provider_type": ["ngo", "government", "private"],
    "beneficiary_group": ["idp", "veteran", "children", "general"],
    "time_range": "last_7_days"
}

# Показати drill-down по організації
org_details = {
    "name": "Психологічна кризова служба м. Харків",
    "active_psychologists": 47,
    "weekly_sessions": 312,
    "avg_session_duration": "52 min",
    "mhGAP_compliance": "94%",
    "last_report_submitted": "2 hours ago"
}
```

**Демонструвати:**

* **Клік на організацію → детальна статистика**  
* **Фільтрація по типах послуг**  
* **Експорт даних в Excel для звіту** 

#### **1.3 Організаційний рівень (3 хв)**

**URL: [coordination.proliska.feelagain.me](http://coordination.proliska.feelagain.me)**  

**Робочий процес психолога:**

**yaml**

```
1. Новий клієнт:
   - Сканування QR або введення ID
   - Автоматична перевірка дублювання (blockchain)
   - Якщо дублювання: показати де вже отримує допомогу
   
2. Початок сесії:
   - Вибір протоколу (mhGAP, PM+, custom)
   - Автоматичне заповнення форм
   - Старт таймера сесії
   
3. Під час сесії:
   - Чек-лист протоколу
   - Нотатки (зашифровані)
   - Алерти про критичні симптоми
   
4. Завершення:
   - Автоматична генерація звіту
   - Планування наступної сесії
   - Направлення до інших спеціалістів
```

---

### **БЛОК 2: АВТОМАТИЗАЦІЯ mhGAP (8 хвилин)**

#### **2.1 Цифрові форми mhGAP (3 хв)**

**URL: [`assessment.mhgap.feelagain.me`](http://dashboard.mhgap.assessment.feelagain.me)** 

**Інтерактивна демонстрація:**

**json**

```json
{
  "assessment_flow": {
    "step1": "Скринінг депресії (PHQ-9)",
    "step2": "Оцінка тривожності (GAD-7)",
    "step3": "Суїцидальний ризик (автоматичний алерт)",
    "step4": "План інтервенції (автогенерація)",
    "step5": "Моніторинг прогресу"
  },
  
  "automation_features": {
    "auto_scoring": true,
    "risk_alerts": true,
    "protocol_suggestions": true,
    "referral_recommendations": true
  }
}
```

**Показати на прикладі:**

1. **Заповнення PHQ-9 на планшеті**  
2. **Автоматичний розрахунок балів**  
3. **Алерт при score \> 15**  
4. **Автоматичне створення плану лікування**  
5. **Інтеграція з календарем для follow-up**

#### **2.2 Звітність для TWG (3 хв)**

**URL: [`reporting.mhgap.feelagain.me`](http://reporting.feelagain.me)**

**Автоматично генеровані звіти:**

**sql**

```sql
-- Приклад SQL запиту для звіту
SELECT 
  organization_name,
  COUNT(DISTINCT beneficiary_id) as unique_beneficiaries,
  COUNT(session_id) as total_sessions,
  AVG(phq9_score_change) as avg_improvement,
  SUM(CASE WHEN dropout = 1 THEN 1 ELSE 0 END) as dropouts
FROM mhpss_sessions
WHERE date >= '2025-09-01'
GROUP BY organization_name
ORDER BY unique_beneficiaries DESC;
```

**Формати експорту:**

* **WHO mhGAP стандартний звіт**  
* **IASC 4Ws matrix**  
* **Custom TWG dashboard**  
* **Excel з pivot tables**  
* **API для OCHA FTS**

#### **2.3 Інтеграція з Task Groups (2 хв)**

**URL: [`reporting.twg.feelagain.me`](http://reporting.twg.feelagain.me)** 

**Специфічні модулі:**

**javascript**

```javascript
// Stress Management Task Force
const pmPlusModule = {
  sessions: 5,
  protocol: "WHO_PM_Plus",
  tracking: ["mood", "functioning", "coping"],
  outcomes: "WHODAS_2.0"
};

// Veterans Task Force  
const vrPtsdModule = {
  hardware: "Meta Quest 3",
  protocols: ["Bravemind", "Strive"],
  sessions: 8,
  metrics: ["PCL-5", "heart_rate_variability"],
  partner: "Geha Mental Health Center"
};

// Education Task Force
const schoolModule = {
  screening: "SDQ",
  interventions: ["psychoeducation", "group_work"],
  parent_involvement: true,
  teacher_training: "integrated"
};
```

---

### **БЛОК 3: BLOCKCHAIN ДЕДУПЛІКАЦІЯ (5 хвилин)**

#### **3.1 Проблема дублювання (2 хв)**

**URL: [`blockchain.duplication.feelagain.me`](http://blockchain.problem.feelagain.me)** 

**Візуалізація проблеми:**

* **Показати як один бенефіціар отримує допомогу в 3 організаціях**  
* **Втрати ресурсів: 3x фінансування на 1 людину**  
* **Інші не отримують допомогу взагалі**

#### **3.2 Рішення через blockchain (3 хв)**

**URL: [`blockchain.solution.feelagain.me`](http://blockchain.solution.feelagain.me)** 

**Live демонстрація:**

**python**

```py
# Процес реєстрації нового бенефіціара
def register_beneficiary(bank_id):
    # 1. Hash Bank ID для анонімності
    anonymous_id = hash_function(bank_id + salt)
    
    # 2. Перевірка в blockchain
    existing = blockchain.check_registration(anonymous_id)
    
    if existing:
        # 3. Показати де вже отримує допомогу
        return {
            "status": "duplicate",
            "current_provider": existing.provider_name,
            "started": existing.start_date,
            "sessions_remaining": existing.sessions_left
        }
    else:
        # 4. Створити новий запис
        blockchain.create_record(anonymous_id, provider_id)
        return {"status": "registered", "id": anonymous_id}
```

**Показати транзакцію в blockchain explorer:**

* **Transaction hash**  
* **Timestamp**  
* **Encrypted beneficiary ID**  
* **Provider signature**  
* **Smart contract execution**

---

### **БЛОК 4: ІНТЕГРАЦІЇ (5 хвилин)**

#### **4.1 Українські державні системи (3 хв)**

**URL: [`integrations.feelagain.me`](http://integrations.feelagain.me)** 

**Діючі інтеграції:**

**yaml**

```
Дія:
  - KYC через BankID
  - Цифрові документи психолога
  - Push-нотифікації клієнтам
  
eHealth:
  - Реєстр медичних працівників
  - Електронні направлення
  - Рецепти (за потреби)
  
Helsi:
  - 23M пацієнтів в базі
  - Історія звернень
  - Календар записів
  
OpenDataBot:
  - Верифікація організацій
  - Перевірка ліцензій
  - Фінансова прозорість
```

#### **4.2 Міжнародні системи (2 хв)**

**URL: [`integrations.int.feelagain.me`](http://integrations.int.feelagain.me)** 

**API endpoints:**

**javascript**

```javascript
// OCHA Financial Tracking Service
POST /api/ocha/fts/report
{
  "reporting_org": "FEEL_Again",
  "period": "2025-09",
  "total_beneficiaries": 23451,
  "total_funding_tracked": 1250000,
  "breakdown_by_donor": {...}
}

// WHO mhGAP reporting
POST /api/who/mhgap/submission
{
  "country": "UA",
  "region": "Kharkiv",
  "indicators": {
    "depression_treated": 3421,
    "anxiety_treated": 2890,
    "ptsd_treated": 1560,
    "substance_use_treated": 780
  }
}
```

---

### **БЛОК 5: LIVE Q\&A та КАСТОМІЗАЦІЯ (5 хвилин)**

#### **5.1 Питання** 

#### **Бути готовим показати:**

* **Як додати нову організацію (2 хв процес)**  
* **Як створити custom протокол**  
* **Як налаштувати алерти**  
* **Як дати доступ координатору регіону**

#### **5.2 Кастомізація під потреби партнера**

#### **Що можна змінити за 1 тиждень:**

* **Додаткові поля в формах**  
* **Нові типи звітів**  
* **Специфічні KPI**  
* **Мовні версії (вже є UK/EN/RU)**

---

## **🔧 ТЕХНІЧНІ ВИМОГИ ДЛЯ ДЕМО**

### **Середовище:**

**bash**

```shell
# Production-like demo environment
Server: AWS EC2 (Frankfurt)
Database: PostgreSQL 14 + MongoDB
Blockchain: Hyperledger Fabric
Cache: Redis
Queue: RabbitMQ
Monitoring: Grafana + Prometheus
```

### **Тестові дані:**

* **50 організацій з реальними назвами**  
* **500 психологів (анонімізовані)**  
* **10,000 сесій за останній місяць**  
* **5,000 унікальних бенефіціарів**

### **Доступи для демо:**

```
Admin TWG: partner_admin@demo.feelagain.me / partner2025Demo!
Coordinator: coordinator@demo.feelagain.me / Coord2025
Psychologist: prof@demo.feelagain.me / Prof2025
Viewer: viewer@demo.feelagain.me / View2025
```

### **Backup план:**

1. **Записане відео кожного блоку (1080p)**  
2. **Offline версія на localhost**  
3. **Screenshots всіх ключових екранів**  
4. **PDF з технічною документацією**

---

## **📱 MOBILE ДЕМО (опціонально)**

**Якщо попросять показати мобільну версію:**

* **iOS/Android apps (React Native)**  
* **Offline mode для польових умов**  
* **Синхронізація при з'єднанні**  
* **Push notifications для нагадувань**

---

## **🎬 ФІНАЛ**

**"Готові до впровадження"**

* **Пілот з 10 організацій: 1 тиждень**  
* **Повне розгортання для регіону: 1 місяць**  
* **Національне покриття: 3 місяці**  
* **Технічна підтримка: 24/7**  
* **Навчання користувачів: включено**

**Контакти для технічних питань:**

* **CTO: \[буде призначено\]**  
* **DevOps: \[Enkidu contact\]**  
* **API документація: [docs.feelagain.me/api](http://docs.feelagain.me/api)**  
* 

**Важливо:**

1. **Всі API endpoints повинні працювати**  
2. **Не більше 200ms latency на запити**  
3. **Українська локалізація має бути 100%**  
4. **Blockchain explorer має показувати реальні транзакції**  
5. **Дашборди мають оновлюватися в реальному часі (WebSocket)**

---

**Підготовлено: FeeL Again Technical Team Версія: 1.0**

