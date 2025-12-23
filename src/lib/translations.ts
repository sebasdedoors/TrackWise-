
export const translations = {
  en: {
    // Header
    trackWise: 'TrackWise',
    manageTemplates: 'Manage Templates',
    addTask: 'Add Task',
    signOut: 'Sign Out',

    // LanguageSelector
    english: 'EN',
    spanish: 'ES',
    japanese: 'JA',

    // AssistantSuggestions
    assistantSuggestions: 'Assistant Suggestions',
    assistantDescription: 'Let AI help you prioritize your tasks for the day.',
    analyzingTasks: 'Analyzing your tasks...',
    error: 'Error',
    suggestion: 'Suggestion',
    suggestionReasoning: 'Based on your tasks, I recommend the following order:',
    getSuggestionError: 'There was an error getting the suggestion. Please try again.',
    suggestedOrder: 'Suggested Order:',
    getSuggestionPrompt: 'Click the button to get an action plan.',
    addTasksPrompt: 'Add at least two tasks to get a suggestion.',
    thinking: 'Thinking...',
    getSuggestion: 'Get Suggestion',
    applyOrder: 'Apply Order',

    // DeleteConfirmationDialog
    deleteConfirmationTitle: 'Are you sure?',
    deleteConfirmationDescription: 'This action cannot be undone. This will permanently delete the task.',
    cancel: 'Cancel',
    delete: 'Delete',

    // FocusModeTimer
    focusMode: 'Focus Mode',
    resume: 'Resume',
    pause: 'Pause',
    endSession: 'End Session',

    // ProductivityHub
    productivityHub: 'Productivity Hub',
    productivityHubDescription: 'Your weekly performance and stats.',
    dayStreak: 'Day Streak',
    onTimeRate: 'On-Time Rate',
    totalCompleted: 'Total Completed',
    tasksThisWeek: 'Tasks This Week',
    weeklyOverview: 'Weekly Overview',

    // QuickChecklist
    quickChecklist: 'Quick Checklist',
    quickChecklistFull: 'Checklist is full',
    quickChecklistFullDescription: 'You can only have a maximum of 5 items in your quick checklist.',
    addQuickItem: 'Add a quick item...',
    addUpTo5: 'Add up to 5 quick items.',

    // TaskCard
    moreOptions: 'More options',
    work: 'Work',
    school: 'School',
    personal: 'Personal',
    health: 'Health',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    uncategorized: 'Uncategorized',
    edit: 'Edit',
    focus: 'Focus',

    // TaskDashboard
    todaysTasks: "Today's Tasks",
    allTasks: 'All Tasks',
    pending: 'Pending',
    completed: 'Completed',
    filterByView: 'Filter by view',
    filterByCategory: 'Filter by category',
    allCategories: 'All Categories',
    filterByPriority: 'Filter by priority',
    allPriorities: 'All Priorities',

    // TaskFormDialog
    newTask: 'New Task',
    editTask: 'Edit Task',
    updateTaskDescription: 'Update the details of your task.',
    newTaskDescription: 'Fill in the details for your new task.',
    taskTitle: 'Title',
    titlePlaceholder: 'e.g. Finish project report',
    taskCategory: 'Category',
    selectCategory: 'Select a category',
    taskPriority: 'Priority',
    selectPriority: 'Select a priority',
    taskDueDate: 'Due Date',
    pickDate: 'Pick a date',
    saveChanges: 'Save Changes',
    createTask: 'Create Task',
    titleMinLength: 'Title must be at least 3 characters.',
    dueDateRequired: 'A due date is required.',
    save: 'Save',

    // TaskList
    noTasksToday: 'No tasks for today!',
    noTasksHint: 'Try adjusting your filters or adding a new task.',

    // TemplateManagerDialog
    templateManager: 'Template Manager',
    templateManagerDescription: 'Manage your task templates.',
    newTemplate: 'New Template',
    templateName: 'Template Name',

    // Login
    welcome: 'Welcome to TrackWise',
    signIn: 'Sign in with Google',

    // suggestTaskOrderFlow
    aiPrompt: `Analyze the following list of tasks for today. Consider the priority, category, and title of each task to determine the best order of execution.
      
      Tasks:
      {{#each tasks}}
      - ID: {{id}}, Title: "{{title}}", Category: {{category}}, Priority: {{priority}}
      {{/each}}
      
      Return a JSON object with two keys:
      1.  'orderedTaskIds': An array of task IDs in the order you suggest they be completed.
      2.  'reasoning': A brief explanation (1-2 sentences) of your strategy. For example, "I recommend starting with high-priority tasks to ensure they are completed, followed by focused work on a specific category."
      
      Prioritize high-priority tasks first. Group tasks by category when possible to minimize context switching. Low-priority tasks should go last.`,
  },
  es: {
    // Header
    trackWise: 'TrackWise',
    manageTemplates: 'Gestionar Plantillas',
    addTask: 'Añadir Tarea',
    signOut: 'Cerrar Sesión',

    // LanguageSelector
    english: 'EN',
    spanish: 'ES',
    japanese: 'JA',

    // AssistantSuggestions
    assistantSuggestions: 'Sugerencias del Asistente',
    assistantDescription: 'Deja que la IA te ayude a priorizar tus tareas del día.',
    analyzingTasks: 'Analizando tus tareas...',
    error: 'Error',
    suggestion: 'Sugerencia',
    suggestionReasoning: 'Basado en tus tareas, te recomiendo el siguiente orden:',
    getSuggestionError: 'Hubo un error al obtener la sugerencia. Por favor, inténtalo de nuevo.',
    suggestedOrder: 'Orden Sugerido:',
    getSuggestionPrompt: 'Haz clic en el botón para obtener un plan de acción.',
    addTasksPrompt: 'Agrega al menos dos tareas para obtener una sugerencia.',
    thinking: 'Pensando...',
    getSuggestion: 'Obtener Sugerencia',
    applyOrder: 'Aplicar Orden',

    // DeleteConfirmationDialog
    deleteConfirmationTitle: '¿Estás seguro?',
    deleteConfirmationDescription: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea.',
    cancel: 'Cancelar',
    delete: 'Eliminar',

    // FocusModeTimer
    focusMode: 'Modo Concentración',
    resume: 'Reanudar',
    pause: 'Pausar',
    endSession: 'Terminar Sesión',

    // ProductivityHub
    productivityHub: 'Centro de Productividad',
    productivityHubDescription: 'Tu rendimiento y estadísticas semanales.',
    dayStreak: 'Racha de Días',
    onTimeRate: 'Tasa de Puntualidad',
    totalCompleted: 'Total Completadas',
    tasksThisWeek: 'Tareas Esta Semana',
    weeklyOverview: 'Resumen Semanal',

    // QuickChecklist
    quickChecklist: 'Lista Rápida',
    quickChecklistFull: 'La lista está llena',
    quickChecklistFullDescription: 'Solo puedes tener un máximo de 5 elementos en tu lista rápida.',
    addQuickItem: 'Añade un elemento rápido...',
    addUpTo5: 'Añade hasta 5 elementos rápidos.',

    // TaskCard
    moreOptions: 'Más opciones',
    work: 'Trabajo',
    school: 'Escuela',
    personal: 'Personal',
    health: 'Salud',
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
    uncategorized: 'Sin Categoría',
    edit: 'Editar',
    focus: 'Enfocar',

    // TaskDashboard
    todaysTasks: 'Tareas de Hoy',
    allTasks: 'Todas las Tareas',
    pending: 'Pendientes',
    completed: 'Completadas',
    filterByView: 'Filtrar por vista',
    filterByCategory: 'Filtrar por categoría',
    allCategories: 'Todas las Categorías',
    filterByPriority: 'Filtrar por prioridad',
    allPriorities: 'Todas las Prioridades',

    // TaskFormDialog
    newTask: 'Nueva Tarea',
    editTask: 'Editar Tarea',
    updateTaskDescription: 'Actualiza los detalles de tu tarea.',
    newTaskDescription: 'Rellena los detalles de tu nueva tarea.',
    taskTitle: 'Título',
    titlePlaceholder: 'p.ej. Terminar el informe del proyecto',
    taskCategory: 'Categoría',
    selectCategory: 'Selecciona una categoría',
    taskPriority: 'Prioridad',
    selectPriority: 'Selecciona una prioridad',
    taskDueDate: 'Fecha de Vencimiento',
    pickDate: 'Elige una fecha',
    saveChanges: 'Guardar Cambios',
    createTask: 'Crear Tarea',
    titleMinLength: 'El título debe tener al menos 3 caracteres.',
    dueDateRequired: 'Se requiere una fecha de vencimiento.',
    save: 'Guardar',

    // TaskList
    noTasksToday: '¡No hay tareas para hoy!',
    noTasksHint: 'Intenta ajustar tus filtros o agregar una nueva tarea.',

    // TemplateManagerDialog
    templateManager: 'Gestor de Plantillas',
    templateManagerDescription: 'Gestiona tus plantillas de tareas.',
    newTemplate: 'Nueva Plantilla',
    templateName: 'Nombre de la Plantilla',

    // Login
    welcome: 'Bienvenido a TrackWise',
    signIn: 'Iniciar sesión con Google',

    // suggestTaskOrderFlow
    aiPrompt: `Analiza la siguiente lista de tareas para el día de hoy. Considera la prioridad, categoría y el título de cada tarea para determinar el mejor orden de ejecución.
      
      Tareas:
      {{#each tasks}}
      - ID: {{id}}, Título: "{{title}}", Categoría: {{category}}, Prioridad: {{priority}}
      {{/each}}
      
      Devuelve un objeto JSON con dos claves:
      1.  'orderedTaskIds': Un array de los IDs de las tareas en el orden que sugieres que se completen.
      2.  'reasoning': Una breve explicación (1-2 frases) de tu estrategia. Por ejemplo, "Recomiendo empezar con las tareas de alta prioridad para asegurar que se completen, seguido de un trabajo enfocado en una categoría específica."
      
      Prioriza las tareas de alta prioridad primero. Agrupa las tareas por categoría cuando sea posible para minimizar el cambio de contexto. Las tareas de baja prioridad deben ir al final.`,
  },
  ja: {
    // Header
    trackWise: 'TrackWise',
    manageTemplates: 'テンプレートの管理',
    addTask: 'タスクを追加',
    signOut: 'サインアウト',

    // LanguageSelector
    english: 'EN',
    spanish: 'ES',
    japanese: 'JA',

    // AssistantSuggestions
    assistantSuggestions: 'アシスタントの提案',
    assistantDescription: 'AIに今日のタスクの優先順位付けを手伝ってもらいましょう。',
    analyzingTasks: 'タスクを分析中...',
    error: 'エラー',
    suggestion: '提案',
    suggestionReasoning: 'あなたのタスクに基づいて、次の順序をお勧めします：',
    getSuggestionError: '提案の取得中にエラーが発生しました。もう一度お試しください。',
    suggestedOrder: '推奨順序：',
    getSuggestionPrompt: 'ボタンをクリックしてアクションプランを取得します。',
    addTasksPrompt: '提案を得るには、少なくとも2つのタスクを追加してください。',
    thinking: '考え中...',
    getSuggestion: '提案を取得',
    applyOrder: '順序を適用',

    // DeleteConfirmationDialog
    deleteConfirmationTitle: '本気ですか？',
    deleteConfirmationDescription: 'この操作は元に戻せません。これにより、タスクが完全に削除されます。',
    cancel: 'キャンセル',
    delete: '削除',

    // FocusModeTimer
    focusMode: '集中モード',
    resume: '再開',
    pause: '一時停止',
    endSession: 'セッションを終了',

    // ProductivityHub
    productivityHub: '生産性ハブ',
    productivityHubDescription: 'あなたの週間パフォーマンスと統計。',
    dayStreak: '日連続',
    onTimeRate: '定時率',
    totalCompleted: '合計完了',
    tasksThisWeek: '今週のタスク',
    weeklyOverview: '週間概要',

    // QuickChecklist
    quickChecklist: 'クイックチェックリスト',
    quickChecklistFull: 'チェックリストはいっぱいです',
    quickChecklistFullDescription: 'クイックチェックリストには最大5つの項目しか含めることができません。',
    addQuickItem: 'クイック項目を追加...',
    addUpTo5: '最大5つのクイック項目を追加します。',

    // TaskCard
    moreOptions: 'その他のオプション',
    work: '仕事',
    school: '学校',
    personal: '個人',
    health: '健康',
    high: '高',
    medium: '中',
    low: '低',
    uncategorized: '未分類',
    edit: '編集',
    focus: '集中',

    // TaskDashboard
    todaysTasks: '今日のタスク',
    allTasks: 'すべてのタスク',
    pending: '保留中',
    completed: '完了',
    filterByView: 'ビューでフィルタ',
    filterByCategory: 'カテゴリでフィルタ',
    allCategories: 'すべてのカテゴリ',
    filterByPriority: '優先度でフィルタ',
    allPriorities: 'すべての優先度',

    // TaskFormDialog
    newTask: '新しいタスク',
    editTask: 'タスクを編集',
    updateTaskDescription: 'タスクの詳細を更新します。',
    newTaskDescription: '新しいタスクの詳細を入力してください。',
    taskTitle: 'タイトル',
    titlePlaceholder: '例：プロジェクトレポートを完成させる',
    taskCategory: 'カテゴリー',
    selectCategory: 'カテゴリを選択',
    taskPriority: '優先度',
    selectPriority: '優先度を選択',
    taskDueDate: '期日',
    pickDate: '日付を選択',
    saveChanges: '変更を保存',
    createTask: 'タスクを作成',
    titleMinLength: 'タイトルは3文字以上である必要があります。',
    dueDateRequired: '期日は必須です。',
    save: '保存',

    // TaskList
    noTasksToday: '今日のタスクはありません！',
    noTasksHint: 'フィルタを調整するか、新しいタスクを追加してみてください。',

    // TemplateManagerDialog
    templateManager: 'テンプレートマネージャー',
    templateManagerDescription: 'タスクテンプレートを管理します。',
    newTemplate: '新しいテンプレート',
    templateName: 'テンプレート名',

    // Login
    welcome: 'TrackWiseへようこそ',
    signIn: 'Googleでサインイン',

    // suggestTaskOrderFlow
    aiPrompt: `今日のタスクの次のリストを分析します。各タスクの優先度、カテゴリ、タイトルを考慮して、最適な実行順序を決定します。
      
      タスク:
      {{#each tasks}}
      - ID: {{id}}, タイトル: "{{title}}", カテゴリ: {{category}}, 優先度: {{priority}}
      {{/each}}
      
      2つのキーを持つJSONオブジェクトを返します:
      1.  'orderedTaskIds': 完了を提案する順序でのタスクIDの配列。
      2.  'reasoning': 戦略の簡単な説明（1〜2文）。例：「高優先度のタスクから始めて完了を確実にし、次に特定のカテゴリに焦点を当てた作業を行うことをお勧めします。」
      
      最初に高優先度のタスクを優先します。可能な場合はカテゴリごとにタスクをグループ化して、コンテキストの切り替えを最小限に抑えます。低優先度のタスクは最後にする必要があります。`,
  },
};
