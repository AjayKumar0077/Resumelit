// This file contains translations for the application
// In a real app, we would use a proper i18n library like next-i18next or react-intl

export type Language = "en" | "es" | "fr" | "de" | "zh" | "ja" | "ru" | "ar"

export interface Translations {
  common: {
    appName: string
    loading: string
    save: string
    cancel: string
    edit: string
    delete: string
    download: string
    preview: string
    next: string
    previous: string
    submit: string
    generate: string
    error: string
    success: string
  }
  auth: {
    login: string
    signup: string
    logout: string
    email: string
    password: string
    forgotPassword: string
    dontHaveAccount: string
    alreadyHaveAccount: string
  }
  resume: {
    personalInfo: string
    experience: string
    education: string
    skills: string
    summary: string
    template: string
    review: string
    fullName: string
    jobTitle: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
    institution: string
    degree: string
    field: string
  }
  builder: {
    chat: {
      title: string
      description: string
      placeholder: string
      startChat: string
    }
    form: {
      title: string
      description: string
      startForm: string
    }
    upload: {
      title: string
      description: string
      uploadResume: string
      uploadLinkedin: string
    }
  }
  coverLetter: {
    title: string
    description: string
    jobTitle: string
    companyName: string
    recipientName: string
    additionalInfo: string
    generate: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      appName: "ResumeAI",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      download: "Download",
      preview: "Preview",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      generate: "Generate",
      error: "Error",
      success: "Success",
    },
    auth: {
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
    },
    resume: {
      personalInfo: "Personal Information",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      summary: "Professional Summary",
      template: "Template",
      review: "Review",
      fullName: "Full Name",
      jobTitle: "Job Title",
      email: "Email",
      phone: "Phone",
      location: "Location",
      linkedin: "LinkedIn",
      website: "Website",
      company: "Company",
      position: "Position",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      institution: "Institution",
      degree: "Degree",
      field: "Field of Study",
    },
    builder: {
      chat: {
        title: "Chat-based Builder",
        description: "Build your resume through a guided conversation with AI",
        placeholder: "Type your message...",
        startChat: "Start Chat Builder",
      },
      form: {
        title: "Form-based Generator",
        description: "Fill in structured forms to generate your resume",
        startForm: "Start Form Builder",
      },
      upload: {
        title: "Auto-scan AI",
        description: "Upload existing resume or LinkedIn profile",
        uploadResume: "Upload Resume",
        uploadLinkedin: "Upload LinkedIn",
      },
    },
    coverLetter: {
      title: "Cover Letter Generator",
      description: "Generate a personalized cover letter based on your resume and job details",
      jobTitle: "Job Title",
      companyName: "Company Name",
      recipientName: "Recipient Name",
      additionalInfo: "Additional Information",
      generate: "Generate Cover Letter",
    },
  },
  es: {
    common: {
      appName: "ResumeAI",
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar",
      download: "Descargar",
      preview: "Vista previa",
      next: "Siguiente",
      previous: "Anterior",
      submit: "Enviar",
      generate: "Generar",
      error: "Error",
      success: "Éxito",
    },
    auth: {
      login: "Iniciar sesión",
      signup: "Registrarse",
      logout: "Cerrar sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      dontHaveAccount: "¿No tienes una cuenta?",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
    },
    resume: {
      personalInfo: "Información personal",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      summary: "Resumen profesional",
      template: "Plantilla",
      review: "Revisión",
      fullName: "Nombre completo",
      jobTitle: "Puesto de trabajo",
      email: "Correo electrónico",
      phone: "Teléfono",
      location: "Ubicación",
      linkedin: "LinkedIn",
      website: "Sitio web",
      company: "Empresa",
      position: "Posición",
      startDate: "Fecha de inicio",
      endDate: "Fecha de finalización",
      description: "Descripción",
      institution: "Institución",
      degree: "Título",
      field: "Campo de estudio",
    },
    builder: {
      chat: {
        title: "Constructor por chat",
        description: "Crea tu currículum a través de una conversación guiada con IA",
        placeholder: "Escribe tu mensaje...",
        startChat: "Iniciar constructor por chat",
      },
      form: {
        title: "Generador por formulario",
        description: "Completa formularios estructurados para generar tu currículum",
        startForm: "Iniciar constructor por formulario",
      },
      upload: {
        title: "Escaneo automático con IA",
        description: "Sube un currículum existente o perfil de LinkedIn",
        uploadResume: "Subir currículum",
        uploadLinkedin: "Subir LinkedIn",
      },
    },
    coverLetter: {
      title: "Generador de carta de presentación",
      description: "Genera una carta de presentación personalizada basada en tu currículum y detalles del trabajo",
      jobTitle: "Puesto de trabajo",
      companyName: "Nombre de la empresa",
      recipientName: "Nombre del destinatario",
      additionalInfo: "Información adicional",
      generate: "Generar carta de presentación",
    },
  },
  fr: {
    common: {
      appName: "ResumeAI",
      loading: "Chargement...",
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      download: "Télécharger",
      preview: "Aperçu",
      next: "Suivant",
      previous: "Précédent",
      submit: "Soumettre",
      generate: "Générer",
      error: "Erreur",
      success: "Succès",
    },
    auth: {
      login: "Connexion",
      signup: "S'inscrire",
      logout: "Déconnexion",
      email: "Email",
      password: "Mot de passe",
      forgotPassword: "Mot de passe oublié ?",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
    },
    resume: {
      personalInfo: "Informations personnelles",
      experience: "Expérience",
      education: "Formation",
      skills: "Compétences",
      summary: "Résumé professionnel",
      template: "Modèle",
      review: "Révision",
      fullName: "Nom complet",
      jobTitle: "Titre du poste",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      linkedin: "LinkedIn",
      website: "Site web",
      company: "Entreprise",
      position: "Poste",
      startDate: "Date de début",
      endDate: "Date de fin",
      description: "Description",
      institution: "Institution",
      degree: "Diplôme",
      field: "Domaine d'étude",
    },
    builder: {
      chat: {
        title: "Constructeur par chat",
        description: "Créez votre CV grâce à une conversation guidée avec l'IA",
        placeholder: "Tapez votre message...",
        startChat: "Démarrer le constructeur par chat",
      },
      form: {
        title: "Générateur par formulaire",
        description: "Remplissez des formulaires structurés pour générer votre CV",
        startForm: "Démarrer le constructeur par formulaire",
      },
      upload: {
        title: "Analyse automatique par IA",
        description: "Téléchargez un CV existant ou un profil LinkedIn",
        uploadResume: "Télécharger un CV",
        uploadLinkedin: "Télécharger LinkedIn",
      },
    },
    coverLetter: {
      title: "Générateur de lettre de motivation",
      description: "Générez une lettre de motivation personnalisée basée sur votre CV et les détails du poste",
      jobTitle: "Titre du poste",
      companyName: "Nom de l'entreprise",
      recipientName: "Nom du destinataire",
      additionalInfo: "Informations supplémentaires",
      generate: "Générer une lettre de motivation",
    },
  },
  de: {
    common: {
      appName: "ResumeAI",
      loading: "Wird geladen...",
      save: "Speichern",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      delete: "Löschen",
      download: "Herunterladen",
      preview: "Vorschau",
      next: "Weiter",
      previous: "Zurück",
      submit: "Absenden",
      generate: "Generieren",
      error: "Fehler",
      success: "Erfolg",
    },
    auth: {
      login: "Anmelden",
      signup: "Registrieren",
      logout: "Abmelden",
      email: "E-Mail",
      password: "Passwort",
      forgotPassword: "Passwort vergessen?",
      dontHaveAccount: "Noch kein Konto?",
      alreadyHaveAccount: "Bereits ein Konto?",
    },
    resume: {
      personalInfo: "Persönliche Informationen",
      experience: "Erfahrung",
      education: "Bildung",
      skills: "Fähigkeiten",
      summary: "Berufliches Profil",
      template: "Vorlage",
      review: "Überprüfung",
      fullName: "Vollständiger Name",
      jobTitle: "Berufsbezeichnung",
      email: "E-Mail",
      phone: "Telefon",
      location: "Standort",
      linkedin: "LinkedIn",
      website: "Webseite",
      company: "Unternehmen",
      position: "Position",
      startDate: "Startdatum",
      endDate: "Enddatum",
      description: "Beschreibung",
      institution: "Institution",
      degree: "Abschluss",
      field: "Studienbereich",
    },
    builder: {
      chat: {
        title: "Chat-basierter Builder",
        description: "Erstellen Sie Ihren Lebenslauf durch ein geführtes Gespräch mit KI",
        placeholder: "Nachricht eingeben...",
        startChat: "Chat-Builder starten",
      },
      form: {
        title: "Formularbasierter Generator",
        description: "Füllen Sie strukturierte Formulare aus, um Ihren Lebenslauf zu erstellen",
        startForm: "Formular-Builder starten",
      },
      upload: {
        title: "KI-Auto-Scan",
        description: "Laden Sie einen vorhandenen Lebenslauf oder ein LinkedIn-Profil hoch",
        uploadResume: "Lebenslauf hochladen",
        uploadLinkedin: "LinkedIn hochladen",
      },
    },
    coverLetter: {
      title: "Anschreiben-Generator",
      description: "Generieren Sie ein personalisiertes Anschreiben basierend auf Ihrem Lebenslauf und Jobdetails",
      jobTitle: "Berufsbezeichnung",
      companyName: "Firmenname",
      recipientName: "Name des Empfängers",
      additionalInfo: "Zusätzliche Informationen",
      generate: "Anschreiben generieren",
    },
  },
  zh: {
    common: {
      appName: "ResumeAI",
      loading: "加载中...",
      save: "保存",
      cancel: "取消",
      edit: "编辑",
      delete: "删除",
      download: "下载",
      preview: "预览",
      next: "下一步",
      previous: "上一步",
      submit: "提交",
      generate: "生成",
      error: "错误",
      success: "成功",
    },
    auth: {
      login: "登录",
      signup: "注册",
      logout: "退出",
      email: "电子邮件",
      password: "密码",
      forgotPassword: "忘记密码？",
      dontHaveAccount: "没有账户？",
      alreadyHaveAccount: "已有账户？",
    },
    resume: {
      personalInfo: "个人信息",
      experience: "工作经验",
      education: "教育背景",
      skills: "技能",
      summary: "专业摘要",
      template: "模板",
      review: "审核",
      fullName: "全名",
      jobTitle: "职位名称",
      email: "电子邮件",
      phone: "电话",
      location: "地点",
      linkedin: "领英",
      website: "网站",
      company: "公司",
      position: "职位",
      startDate: "开始日期",
      endDate: "结束日期",
      description: "描述",
      institution: "机构",
      degree: "学位",
      field: "研究领域",
    },
    builder: {
      chat: {
        title: "对话式简历生成器",
        description: "通过与AI的引导对话创建您的简历",
        placeholder: "输入您的消息...",
        startChat: "开始对话式生成器",
      },
      form: {
        title: "表单式简历生成器",
        description: "填写结构化表单以生成您的简历",
        startForm: "开始表单式生成器",
      },
      upload: {
        title: "AI自动扫描",
        description: "上传现有简历或LinkedIn个人资料",
        uploadResume: "上传简历",
        uploadLinkedin: "上传LinkedIn",
      },
    },
    coverLetter: {
      title: "求职信生成器",
      description: "根据您的简历和工作详情生成个性化求职信",
      jobTitle: "职位名称",
      companyName: "公司名称",
      recipientName: "收件人姓名",
      additionalInfo: "附加信息",
      generate: "生成求职信",
    },
  },
  ja: {
    common: {
      appName: "ResumeAI",
      loading: "読み込み中...",
      save: "保存",
      cancel: "キャンセル",
      edit: "編集",
      delete: "削除",
      download: "ダウンロード",
      preview: "プレビュー",
      next: "次へ",
      previous: "前へ",
      submit: "送信",
      generate: "生成",
      error: "エラー",
      success: "成功",
    },
    auth: {
      login: "ログイン",
      signup: "サインアップ",
      logout: "ログアウト",
      email: "メール",
      password: "パスワード",
      forgotPassword: "パスワードをお忘れですか？",
      dontHaveAccount: "アカウントをお持ちでないですか？",
      alreadyHaveAccount: "すでにアカウントをお持ちですか？",
    },
    resume: {
      personalInfo: "個人情報",
      experience: "職歴",
      education: "学歴",
      skills: "スキル",
      summary: "職務要約",
      template: "テンプレート",
      review: "レビュー",
      fullName: "氏名",
      jobTitle: "職種",
      email: "メール",
      phone: "電話番号",
      location: "所在地",
      linkedin: "LinkedIn",
      website: "ウェブサイト",
      company: "会社",
      position: "役職",
      startDate: "開始日",
      endDate: "終了日",
      description: "説明",
      institution: "教育機関",
      degree: "学位",
      field: "専攻分野",
    },
    builder: {
      chat: {
        title: "チャット形式ビルダー",
        description: "AIとの対話を通じて履歴書を作成",
        placeholder: "メッセージを入力...",
        startChat: "チャットビルダーを開始",
      },
      form: {
        title: "フォーム形式ジェネレーター",
        description: "構造化されたフォームに記入して履歴書を生成",
        startForm: "フォームビルダーを開始",
      },
      upload: {
        title: "AI自動スキャン",
        description: "既存の履歴書またはLinkedInプロフィールをアップロード",
        uploadResume: "履歴書をアップロード",
        uploadLinkedin: "LinkedInをアップロード",
      },
    },
    coverLetter: {
      title: "カバーレター生成ツール",
      description: "履歴書と求人情報に基づいてパーソナライズされたカバーレターを生成",
      jobTitle: "職種",
      companyName: "会社名",
      recipientName: "宛名",
      additionalInfo: "追加情報",
      generate: "カバーレターを生成",
    },
  },
  ru: {
    common: {
      appName: "ResumeAI",
      loading: "Загрузка...",
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Редактировать",
      delete: "Удалить",
      download: "Скачать",
      preview: "Предпросмотр",
      next: "Далее",
      previous: "Назад",
      submit: "Отправить",
      generate: "Создать",
      error: "Ошибка",
      success: "Успех",
    },
    auth: {
      login: "Вход",
      signup: "Регистрация",
      logout: "Выход",
      email: "Эл. почта",
      password: "Пароль",
      forgotPassword: "Забыли пароль?",
      dontHaveAccount: "Нет аккаунта?",
      alreadyHaveAccount: "Уже есть аккаунт?",
    },
    resume: {
      personalInfo: "Личная информация",
      experience: "Опыт работы",
      education: "Образование",
      skills: "Навыки",
      summary: "Профессиональное резюме",
      template: "Шаблон",
      review: "Обзор",
      fullName: "Полное имя",
      jobTitle: "Должность",
      email: "Эл. почта",
      phone: "Телефон",
      location: "Местоположение",
      linkedin: "LinkedIn",
      website: "Веб-сайт",
      company: "Компания",
      position: "Должность",
      startDate: "Дата начала",
      endDate: "Дата окончания",
      description: "Описание",
      institution: "Учебное заведение",
      degree: "Степень",
      field: "Область изучения",
    },
    builder: {
      chat: {
        title: "Чат-конструктор",
        description: "Создайте резюме через диалог с ИИ",
        placeholder: "Введите сообщение...",
        startChat: "Начать чат-конструктор",
      },
      form: {
        title: "Форма-генератор",
        description: "Заполните структурированные формы для создания резюме",
        startForm: "Начать форму-конструктор",
      },
      upload: {
        title: "ИИ автосканирование",
        description: "Загрузите существующее резюме или профиль LinkedIn",
        uploadResume: "Загрузить резюме",
        uploadLinkedin: "Загрузить LinkedIn",
      },
    },
    coverLetter: {
      title: "Генератор сопроводительных писем",
      description: "Создайте персонализированное сопроводительное письмо на основе вашего резюме и деталей вакансии",
      jobTitle: "Должность",
      companyName: "Название компании",
      recipientName: "Имя получателя",
      additionalInfo: "Дополнительная информация",
      generate: "Создать сопроводительное письмо",
    },
  },
  ar: {
    common: {
      appName: "ResumeAI",
      loading: "جاري التحميل...",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      download: "تنزيل",
      preview: "معاينة",
      next: "التالي",
      previous: "السابق",
      submit: "إرسال",
      generate: "إنشاء",
      error: "خطأ",
      success: "نجاح",
    },
    auth: {
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      dontHaveAccount: "ليس لديك حساب؟",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
    },
    resume: {
      personalInfo: "المعلومات الشخصية",
      experience: "الخبرة",
      education: "التعليم",
      skills: "المهارات",
      summary: "الملخص المهني",
      template: "القالب",
      review: "مراجعة",
      fullName: "الاسم الكامل",
      jobTitle: "المسمى الوظيفي",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      location: "الموقع",
      linkedin: "لينكد إن",
      website: "الموقع الإلكتروني",
      company: "الشركة",
      position: "المنصب",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      description: "الوصف",
      institution: "المؤسسة التعليمية",
      degree: "الشهادة",
      field: "مجال الدراسة",
    },
    builder: {
      chat: {
        title: "منشئ السيرة الذاتية بالمحادثة",
        description: "أنشئ سيرتك الذاتية من خلال محادثة موجهة مع الذكاء الاصطناعي",
        placeholder: "اكتب رسالتك...",
        startChat: "بدء منشئ المحادثة",
      },
      form: {
        title: "منشئ السيرة الذاتية بالنموذج",
        description: "املأ النماذج المنظمة لإنشاء سيرتك الذاتية",
        startForm: "بدء منشئ النموذج",
      },
      upload: {
        title: "المسح التلقائي بالذكاء الاصطناعي",
        description: "قم بتحميل سيرة ذاتية موجودة أو ملف تعريف لينكد إن",
        uploadResume: "تحميل السيرة الذاتية",
        uploadLinkedin: "تحميل لينكد إن",
      },
    },
    coverLetter: {
      title: "منشئ خطاب التغطية",
      description: "أنشئ خطاب تغطية مخصص بناءً على سيرتك الذاتية وتفاصيل الوظيفة",
      jobTitle: "المسمى الوظيفي",
      companyName: "اسم الشركة",
      recipientName: "اسم المستلم",
      additionalInfo: "معلومات إضافية",
      generate: "إنشاء خطاب التغطية",
    },
  },
}

export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    if (value && value[k]) {
      value = value[k]
    } else {
      // Fallback to English if translation is missing
      let fallback = translations.en
      for (const fallbackKey of keys) {
        if (fallback && fallback[fallbackKey]) {
          fallback = fallback[fallbackKey]
        } else {
          return key // Return the key if even English translation is missing
        }
      }
      return typeof fallback === "string" ? fallback : key
    }
  }

  return typeof value === "string" ? value : key
}

export const translateWithAI = async (text: string, targetLanguage: Language): Promise<string> => {
  if (targetLanguage === "en") return text // No need to translate if target is English

  try {
    // In a real app, we would use the AI SDK to translate the text
    // For demo purposes, we'll simulate a delay and return a mock translation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // This is a mock implementation
    return `[Translated to ${targetLanguage}] ${text}`
  } catch (error) {
    console.error("Error translating text:", error)
    return text // Return original text if translation fails
  }
}
