var aqiData={};
var cityInput=document.getElementById("aqi-city-input");
var aqiInput=document.getElementById("aqi-value-input");

/*用户输入获取数据，向aqi-data增加一条数据，渲染aqi-list列表，增加新增的数据*/
function addAqiData(){
	var city=cityInput.value.trim();
	var aqi=aqiInput.value.trim();
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！");
        return;
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return;
    }
	aqiData[city] = aqi;
}


/*渲染table列表*/
function renderAqiList(){
	var items="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var city in aqiData){
		items +="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city="+city+">删除</button></td></tr>";
	}
	document.getElementById('aqi-table').innerHTML=city ? items : "";
}

function addBtnHandle(){
	addAqiData();
	renderAqiList();
}

function delBtnHandle(city){
	delete aqiData[city];
	renderAqiList();
}


function init(){
	document.getElementById("add-btn").addEventListener("click", addBtnHandle);
	document.getElementById('aqi-table').addEventListener("click",function(event){
		if(event.target.nodeName.toLowerCase()==="button") delBtnHandle.call(null,event.target.dataset.city);
		/*点击删除按钮，事件捕获到删除按钮的data-city属性值也就是city，传入到delBtnHandle函数中，
		函数中删除city属性，然后刷新table表格，而table表格就会重新遍历渲染。使得删除的city不显示*/
	});
}
init();