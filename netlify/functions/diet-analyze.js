exports.handler = async (event) => {
  const { foodName } = JSON.parse(event.body);
  
  const db = {
    '닭가슴살': {calories:165, protein:31, carbs:0, fat:3.6},
    '계란': {calories:77, protein:6.3, carbs:0.6, fat:5.3},
    '밥': {calories:130, protein:2.7, carbs:28, fat:0.3},
    '현미밥': {calories:111, protein:2.5, carbs:23, fat:0.9},
    '고구마': {calories:86, protein:1.6, carbs:20, fat:0.1},
    '감자': {calories:77, protein:2, carbs:17, fat:0.1},
    '소고기': {calories:250, protein:26, carbs:0, fat:17},
    '돼지고기': {calories:242, protein:27, carbs:0, fat:14},
    '연어': {calories:208, protein:20, carbs:0, fat:13},
    '참치': {calories:109, protein:24, carbs:0, fat:1},
    '두부': {calories:76, protein:8, carbs:2, fat:4.5},
    '브로콜리': {calories:34, protein:2.8, carbs:7, fat:0.4},
    '바나나': {calories:89, protein:1.1, carbs:23, fat:0.3},
    '사과': {calories:52, protein:0.3, carbs:14, fat:0.2},
    '오트밀': {calories:389, protein:17, carbs:66, fat:7},
    '아몬드': {calories:579, protein:21, carbs:22, fat:50},
    '우유': {calories:61, protein:3.2, carbs:4.8, fat:3.3},
    '그릭요거트': {calories:59, protein:10, carbs:3.6, fat:0.4},
    '김치': {calories:15, protein:1.1, carbs:2.4, fat:0.5},
    '된장국': {calories:40, protein:3, carbs:4, fat:1.5},
    '삼겹살': {calories:331, protein:14, carbs:0, fat:30},
    '닭다리': {calories:184, protein:24, carbs:0, fat:9},
    '새우': {calories:85, protein:18, carbs:0.9, fat:0.9},
    '고등어': {calories:205, protein:19, carbs:0, fat:14},
    '김밥': {calories:180, protein:5, carbs:32, fat:3.5},
    '라면': {calories:380, protein:9, carbs:55, fat:14},
    '빵': {calories:265, protein:9, carbs:49, fat:3.2},
    '샐러드': {calories:20, protein:1.5, carbs:3, fat:0.3},
    '프로틴쉐이크': {calories:120, protein:24, carbs:5, fat:2},
  };

  let result = {calories:100, protein:10, carbs:10, fat:5};
  let found = false;
  
  Object.keys(db).forEach(food => {
    if (foodName.includes(food)) {
      result = db[food];
      found = true;
    }
  });

  // 양(g) 파싱
  const match = foodName.match(/(\d+)\s*g/);
  if (match && found) {
    const ratio = parseInt(match[1]) / 100;
    result = {
      calories: Math.round(result.calories * ratio),
      protein: Math.round(result.protein * ratio * 10) / 10,
      carbs: Math.round(result.carbs * ratio * 10) / 10,
      fat: Math.round(result.fat * ratio * 10) / 10
    };
  }

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(result)
  };
};
