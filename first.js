const main=document.querySelector("#main");
const qna=document.querySelector("#qna");
const result=document.querySelector("#result");
const endPoint = 12;
const resp=[];

function cResult(){
  var pointArray=[
    {name: '네온', value:0, key:0},
    {name: '산소', value:0, key:1},
    {name: '칼륨', value:0, key:2},
    {name: '수소', value:0, key:3},
    {name: '탄소', value:0, key:4},
    {name: '규소', value:0, key:5},
    {name: '나트륨', value:0, key:6},
    {name: '플루오린', value:0, key:7},
    {name: '헬륨', value:0, key:8},
    {name: '아르곤', value:0, key:9},
    {name: '질소', value:0, key:10},
    {name: '리튬', value:0, key:11},
    {name: '마그네슘', value:0, key:12},
    {name: '알루미늄', value:0, key:13},
    {name: '염소', value:0, key:14},
    {name: '칼슘', value:0, key:15}
  ]

  for(let i=0; i<endPoint; i++){
    var target=qnaList[i].a[resp[i]];
    for(let j=0; j<target.type.length; j++){
      for(let k=0; k<pointArray.length; k++){
        if(target.type[j]===pointArray[k].name){
          pointArray[k].value+=1;
        }
      }
    }
  }
  var rArray=pointArray.sort(function(a,b){
    if(a.value>b.value){
      return -1;
    }
    if(a.value<b.value){
      return 1;
    }
    return 0;
  });
  let resultword=rArray[0].key;
  return resultword
}

function setResult(){
  let point = cResult();
  const resultName=document.querySelector('.resultName');
  resultName.innerHTML=infoList[point].name;

  var resultImage=document.createElement('img');
  const imgDiv=document.querySelector('#resultImage');
  var imgURL='img/'+(point+1)+'.png';
  resultImage.src=imgURL;
  resultImage.classList.add('img-fluid');
  imgDiv.appendChild(resultImage);

  const resultDesc=document.querySelector('.resultDesc');
  resultDesc.innerHTML=infoList[point].desc;
}

function goResult(){
  qna.style.display="none";
  result.style.display="block";
  setResult();
  cResult();
}

function addAnswer(answerText, qIdx, idx){
  var a=document.querySelector('.answerBox');
  var answer=document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('py-3');
  answer.classList.add('my-3');
  answer.classList.add('mx-auto');
  a.appendChild(answer);
  answer.innerHTML=answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    resp[qIdx]=idx;
    for(let i = 0; i < children.length; i++){
      children[i].disabled=true;
      children[i].style.display='none';
    }
    goNext(++qIdx);
  }, false);
}

function goNext(qIdx){
  if(qIdx===endPoint){
    goResult();
    return;
  }
  var q=document.querySelector('.qBox');
  q.innerHTML=qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
}

function begin(){
  main.style.display="none";
  qna.style.display="block";
  let qIdx=0;
  goNext(qIdx);
}
