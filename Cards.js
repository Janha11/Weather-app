
const data = [
    { title:'UvIndex'    , uvIndex: 0, level: 'low' },
    { title:'WindStatus' , uvIndex: 0, level: 'low' },
    {  title:'Sunrise&Sunset' , uvIndex: 0, level: 'low' },
    {  title:'Humidity', uvIndex: 0, level: 'low' },
    { title:'Visibility',uvIndex: 0, level: 'low' },
    { title:'Air Quality',uvIndex: 0, level: 'low' }
  ]

 export const cardsHTML = data.map((item, index) => `
    <div class="card2 " id=${index}>
      <h5 class="card-heading">${item.title}</h5>
      <div class="content">
        <p class="uv-index">${item.uvIndex}</p>
        <p class="uv-index">${item.level}</p>
      </div>
    </div>
  `);
