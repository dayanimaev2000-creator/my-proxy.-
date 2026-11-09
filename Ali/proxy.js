export default async function handler(req, res) {
  // Настраиваем CORS, чтобы твой сайт мог делать запросы к этому прокси
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Если браузер шлет предварительный запрос (OPTIONS), сразу отвечаем ок
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 1. Укажи здесь адрес реального API, к которому хочешь обратиться
    const targetUrl = 'https://tabrica.ru/orgs/alina-sayty/settings?tab=api'; 

    // 2. Вставь сюда свой секретный токен
    const secretToken = 'tab_YuJ2J8SaIVgESG2tA59evAjZSWFbcHFl6qddiTlnGdVrWJGQocQSfhMpyWHY4gHh';

    // Делаем запрос к реальному API с добавлением токена
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': XXXINLINECODEXXX3XXXINLINECODEXXX // или 'Token ' + secretToken, в зависимости от API
      },
      // Пересылаем тело запроса, если оно есть (для POST-запросов)
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    
    // Возвращаем ответ от API твоему сайту
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Ошибка прокси: ' + error.message });
  }
}
