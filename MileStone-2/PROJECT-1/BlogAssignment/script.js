// for storing usres information
let users=[];
// for  identifing all user on blog page
let id;
// after validating all field of form than store in local storage if validation function returns ture
let status1=false;
// it will be shown when the form is successfully submitted.
let success_message=document.querySelector(".success-message");

function homePage()
{
  let addButton=document.querySelector(".addButton")
  let popContainer=document.getElementById("popup-container");
  
  
  let blog=document.getElementById("blog");
  let close=document.getElementById("close");
  let submit_btn=document.getElementById("submit_btn");
  
  
  addButton.addEventListener("click",()=>{
     
    popContainer.style.display="block";

    // now freeze the scroll bar
    window.addEventListener('scroll', freezeScrollbar)
    reset_Form_Fields();  
      
  })
  // code for freeze the scrolling
  function freezeScrollbar()
  {
    window.scrollTo(0,0)
  }
  close.addEventListener("click",()=>{
      popContainer.style.display="none";
      
      // removing the scroll bar freezing
      window.removeEventListener('scroll',freezeScrollbar);

       store();

  })
  
  
  submit_btn.addEventListener("click",(e)=>{
      e.preventDefault();
  })
 
  // SETTING ID DEFAULT VALUE ZERO(0) IN LOCAL STORAGE FIRST TIME WHEN THIS WEB PAGE WILL LOAD
   id=JSON.parse(localStorage.getItem('id'));
    if(id==undefined)
    localStorage.setItem('id',0);

 

  if(JSON.parse(localStorage.getItem("users"))==null)
  {
      localStorage.setItem("users"," ");
  }
   // FETCHING DATA FROM BROWSER LOCAL STORAGE FOR DISPLAY THE POST
  else{
  let b_users=JSON.parse(localStorage.getItem("users"));
  let poster;
  users.push(...b_users);
  
  
  if(users!=null){
 
  for(let i=0;i<users.length;i++){
 
  // if(users[i].poster != "N/A"){
  //      poster=users[i].poster;
      
  // }

  
  blog.innerHTML+=
      `
        <div class="b-list">
                 
  
        <div class="img-box">
            <img src="${users[i].poster}" alt="image not found">
        </div>
        
        <p class="b-title">
          ${users[i].title}
        </p>
  
        <p class="b-des">
         ${users[i].des}
        </p>
        
        <a href="BlogPage.html?id=${users[i].id}" id="b-btn" class="anchor" targer=_blank>Read</a>  
        </div>
        
      `
     
  }
  }
  }
  
   
}
function info()
{
    // FETCHING VALUE OF ID FROM BROWSER LOCAL STORAGE 
    id=JSON.parse(localStorage.getItem('id'));
  
    // FETCHING VALUE OF FORM INPUT FIELD

    let poster=document.getElementById("url").value;
    let error_poster=document.getElementById("error_url");
    let title=document.getElementById("title").value;
    let error_title=document.getElementById("error_title");
    let des=document.getElementById("des").value;
    let error_des=document.getElementById("error_des");
    let write=document.getElementById("write").value;
    let error_write=document.getElementById("error_write");
   
  //  CHECKING FORM VALIDATION (POST WILL APPEAR ON SCREEN IF THE ALL INPUT FIELD WILL BE FILLED)
    status1=validation(poster,error_poster,title,error_title,des,error_des,write,error_write);
   if(status1){
    
    let user={
        poster:poster,
        title:title,
        des:des,
        write:write,
        id:++id
    }
    // NEW USER HAS BEEN PUSH TO ARRAY
    users.push(user)
    localStorage.setItem('id',id);
    
   
    if(user.poster=="N/A")
    {
       // here I assign  images not found image url in poster variable;
      user.poster ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfTuch8F_PkEaqS6nATu1Bwm6ppJrPcghMg&usqp=CAU";
    }

    blog.innerHTML+=
    `
      <div class="b-list">

      <div class="img-box">
      <img src="${user.poster}" alt="image not found">
      </div>
      
      <p class="b-title">
          ${user.title}
      </p>

      <p class="b-des">
          ${user.des}
      </p>
    
      <a href="BlogPage.html?id=${user.id}" id="b-btn" class="anchor"  targer=_blank>Read</a> 
      
     </div>
        
    `
   
//  RESET INPUT FORM FIELDS
     reset_Form_Fields()

 }
   
  
  
  
}
// FOR IMAGE URL VALIDATION
  function validateURL(urlString)
  {
         try{
            return Boolean(new URL(urlString))
         }
         catch(e)
         {
            return false;
         }
  }

//FOR ALL FORM FIELD VALIDATION .IT WILL RETURN TRUE THEN THE FORM WILL ADDED IN BLOGLIST AND LOCAL STORAGE
function validation(poster,error_poster,title,error_title,des,error_des,write,error_write){


  let flag=1;
     if(!validateURL(poster))
     {
       flag=0;
       error_poster.style.display="block";
       error_poster.textContent="Enter Valid URL For Poster"
       return false;
     }
    else
     {
      error_poster.style.display="none";
      flag=1; 
     }

    if(title.length<10)
    {
        error_title.style.display="block";
        error_title.textContent="Enter Valid Title(more then 10 words)"
        
        flag=0;
        return false;
      }
   else
   {
    error_title.style.display="none";
        
    flag=1;
   }
   if(des.length<20)
    {
        error_des.style.display="block";
        error_des.textContent="Enter Valid Description (more then 20 words)"
        
       flag=0;
       return false;
    }
   else
   {
    error_des.style.display="none";
        
    flag=1;
   }
    if(write.length<100)
    {
        error_write.style.display="block";
        error_write.textContent="Enter more then 100 words";
       
        flag=0;
        return false;
    }
    else{
      error_write.style.display="none";
        
      flag=1;
    }
    if(flag){ 
    success_message.textContent="NEW POST HAS BEEN ADDED IN BLOG-LIST";
    success_message.classList.toggle("hide");
    setTimeout(()=>{success_message.classList.toggle("hide")},3000);
    return true; 
  }

   
  }
  
// Reset Form Field after submition
function reset_Form_Fields(){

  let x=document.forms["myForm"];
  for(let i=0;i<x.length-1;i++)
   {
     x[i].value="";
   }
  // error message removing code (for addbutton) (when some one left the form incomplete and another person come to add a new post so another person will not get the previous person's incomplete form data)
  document.getElementById("error_url").textContent="";
  document.getElementById("error_title").textContent="";
  document.getElementById("error_des").textContent="";
  document.getElementById("error_write").textContent="";
}

//  STORE USERS ARRAY IN LOCAL STORAGE 
function store()
{
  if(status1) { 
    console.log("store");
    localStorage.setItem("users",JSON.stringify(users));
    
    console.log("The Post has been stored")
    alert("NEW POSTS HAVE BEEN STORED IN LOCAL STORAGE");
   
   }
  else{
 
    console.log("The Post has not been stored")

    alert("NEW POSTS HAVE NOT BEEN STORED IN LOCAL STORAGE");
  
   }
}
// HOME PAGE CODE ENDS HERE
// -------------------------------------------------------------------------

// BLOG PAGE CODE STARTS HERE
// DISPPLAY THE CLICKED POST DETAILS
function details(id)
{

  let blogContent=document.getElementById("blogContent"); 
 
  let info=JSON.parse(localStorage.getItem("users"));
  for(let i=0; i<info.length;i++)
  {   
        // MATCHING QUERY STRING ID TO USER ID FOR GETTING CLICKED POST INFORMATION
        if(info[i].id==id){
          
        blogContent.innerHTML=
        `<div id="blog-content-heading">
          <div id="blog-page-info">
         <h4 class="b-title">${info[i].title}</h4>
          <p class="b-des" style=" margin-bottom: 0;">${info[i].des}</p>
           </div>
           <div id="blog-page-img-box" class="anchor">
           <img src="${info[i].poster}" alt='image not found'>
           </div>
         </div>
         <div id="blog-page-details">
           <p id="detail">${info[i].write}</p>
          </div>
        `
     
        break;  
      }
       
    }
  
}
// CALLED WHEN BLOG PAGE LOADED 
function blogPageLoad(params)
{
  // HERE I GET ID VALUE FORM URL USING params.get() FUNCTION
  let id=params.get("id"); 
 
  //  CALL DEAILS METHOD WITH ( USING QUERY STRING) ID
  details(id);

adding_NewLine_In_Paragraph();

}
//CODE FOR ADDING EXTRA LINE(</br> tag) IN PARAGRAGH(detail (PARAGRAPH ID)) IF THAT LENGTH IS MORE THEN 300 words. THIS PARAGRAPH BELONG TO BLOG PAGE(ANOTHER PAGE) 
function adding_NewLine_In_Paragraph()
{

 let detail= document.getElementById("detail") ;
 index=0;
 ends=300;
// position:-> IT'S OUR POSTION TO JUDGE HOW MANY WORDS ARE LEFT TO MEET THE CONDTION position.length>300.
 let position=detail.textContent.substring(0,detail.textContent.length);

// HERE I FIRST PRINT IN CONSOLE THE TOTAL WORDS BEFORE ADDING </BR> TAG IN DETAIL ELEMENT AFTER THAT I MADE IT EMPTY.
 console.log("BEFORE ADDING <br>tag detail(PARAGRAPH) TOTAL WORDS: ",detail.textContent.length)

// EMPTY THE DETAIL ELEMENT
detail.textContent=""

  while(true){
    if(position.length>ends)
       {
          let text=position.substring(index,ends);
   
          let text2=position.substring(ends,position.length);
          detail.innerHTML+=text+"</br></br>";
           
          position=text2;
         
       }
       else
       break;
     
     }
// NOW position.LENGTH<300 THAN ADD THE REMAING WORDS TO THE DETAIL ELEMENT
detail.innerHTML+=position;

// HERE I  PRINT IN CONSOLE THE TOTAL WORDS IN DETAIL ELEMENT AFTER ADDING </BR> TAG IN DETAIL ELEMENT

console.log("AFTER Adding <br>tag detail(PARAGRAPH) TOTAL WORDS: ",detail.textContent.length);

// AFTER AND BEFORE IN DETILA element(<p> tag) WORDS (LENGTH) ARE SAME IT MEANS THE CODE IS WORKING CORRECT. 

}
// BLOG PAGE CODE ENDS HERE