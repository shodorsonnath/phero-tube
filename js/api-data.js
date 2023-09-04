const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.classList = `btn bg-red-500 hover:bg-rose-500 flex mt-3 mb-5 md:ml-3 lg:ml-5`;
    div.innerHTML = `
        <a onclick="handleLoadVideo('${category.category_id}')" class="tab text-white">${category.category}</a>
        `;
    tabContainer.appendChild(div);
  });
};

const handleLoadVideo = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const cardContainer = document.getElementById("card-container");
  const cardItem = document.getElementById("card-item")
  cardItem.innerHTML = "";


  if (data.data.length === 0) {
    const divicon = document.createElement("div");
    divicon.innerHTML = `
    <div class="flex flex-col justify-center items-center mt-8">
    <img src="image/Icon.png" alt="">
    <p class="mt-4 font-semibold text-xl lg:text-3xl text-center">Oops!! Sorry, There is no <br> content here</P>
    `
    cardContainer.appendChild(divicon);
  } 
  else {
    const videosData = data.data;
    videosData.forEach((videos) => {
      const postDate = parseFloat(videos.others.posted_date);
      const postDateDay = parseFloat(postDate / (24*3600))
      const postDateHour = parseInt(postDate/3600);
      const postDateMin = parseInt((postDate - (3600 * postDateHour)) / 60);
      console.log(postDateHour, postDateMin);
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card w-[300px] bg-base-100 shadow-xl">
          <figure>
            <img class="w-[280px] h-60" src=${videos.authors[0].profile_picture} alt="image" />
            <div>
            
            </div>
          </figure>
          <div class="card-body">
            <div class="card-footer flex justify-between mt-8">
              <div class="flex">
                <div>
                  <div class="avatar">
                    <div class="w-14 rounded-full">
                      <img src=${videos.thumbnail} />
                      
                    </div>
                  </div>
                </div>
                <div>
                  <h2 class="font-bold ml-3 text-sm">${videos.title}</h2>
                  <p class="ml-3 mt-1 text-sm">${videos.authors[0].profile_name}<span>${
                    videos.authors[0].verified
                      ? '<span class="verified-icon ml-2"><i class="fa-solid fa-certificate" style="color: #1968f0;"></i></span>'
                      : ''
                  } <span></p>
                  <p class="ml-3 mt-2 text-sm">${videos.others.views} <span> views </span> </p>
                  
                  <div class="absolute">
                    <div class="relative p-1 -mt-44 ml-6 ${!isNaN(postDateHour) && !isNaN(postDateMin) ? 'bg-black rounded' : ''}">
                    <p class="text-white text-sm">${!isNaN(postDateHour) && !isNaN(postDateMin) ? `${postDateHour}hrs ${postDateMin} min ago` : ''}</P>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      cardItem.appendChild(div);
    });
  }
};

handleCategory();
handleLoadVideo("1000");

