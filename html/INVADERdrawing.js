function check_fromDateTime(form){
 if (form.from_date.value>form.to_date.value){
  form.from_date.value=form.to_date.value;
 }
 if (form.from_date.value==form.to_date.value){
  if (form.from_time.value>form.to_time.value){
   form.from_time.value=form.to_time.value;
  }
 }
 if (form.from_date.value<"2014-02-28"){
  form.from_date.value="2014-02-28";
 }
 if (form.from_date.value=="2014-02-28"){
  if (form.from_time.value<"09:00:00"){
   form.from_time.value="09:00:00";
  }
 }
 set_fromUnixTime(form);
}

function set_fromUnixTime(form){
 var fromUdate=form.from_date.value;
 var fromUtime=form.from_time.value;
 var ymd=fromUdate+"T"+fromUtime+"Z";
 form.from_utcDateTime.value=ymd;
 var dT=new Date(form.from_utcDateTime.value);
 var dS1=dT.getTime();
 var dS2=Math.floor(dS1/1000);
 form.from_utime.value=dS2;
}

function check_toDateTime(form){
 if (form.to_date.value<form.from_date.value){
  form.to_date.value=form.from_date.value;
 }
 if (form.to_date.value==form.from_date.value){
  if (form.to_time.value<form.from_time.value){
   form.to_time.value=form.from_time.value;
  }
 }
 if (form.to_date.value>"2014-09-02"){
  form.to_date.value="2014-09-02";
 }
 if (form.to_date.value=="2014-09-02"){
  if (form.to_time.value>"00:47:00"){
   form.to_time.value="00:47:00";
  }
 }
 set_toUnixTime(form);
}

function set_toUnixTime(form){
 var toUdate=form.to_date.value;
 var toUtime=form.to_time.value;
 var ymd=toUdate+"T"+toUtime+"Z";
 form.to_utcDateTime.value=ymd;
 var dT=new Date(form.to_utcDateTime.value);
 var dS1=dT.getTime();
 var dS2=Math.floor(dS1/1000);
 form.to_utime.value=dS2;
}

function getInfo(form){
 document.getElementById("status").innerHTML='Getting Data';
 var dFromTime=form.from_utime.value;
 var dToTime=form.to_utime.value;
 var dPara='http://api.artsat.jp/invader/sensor_data_range.js?begin='+dFromTime+'&end='+dToTime+'&sensor=gx,gy,gz&callback';
 var scr=document.createElement('script');
 scr.src=dPara;
 document.getElementsByTagName('body').item(0).appendChild(scr);
}

function clear_drawing(form){
 document.getElementById("status").innerHTML='Clear';

 var canvas=document.getElementById("draw_area");
 var context=canvas.getContext("2d");
 context.globalCompositeOperation="source-over";
 context.setTransform(1,0,0,1,0,0);
 context.clearRect(0,0,canvas.width,canvas.height);
}

function artsat_invader_sensor_data_cb(resp){

 var status=document.getElementById("status");

if (resp==null){
 status.textContent='No Data';
}else{
 status.textContent='Drawing';

 var resdata=resp.results;

 var canvas=document.getElementById("draw_area");

 var context=canvas.getContext("2d");
 context.globalAlpha = 1.0;

 var color_value=document.getElementById("d_color");
 context.strokeStyle="#"+color_value.value;

 context.lineWidth=5.0;
 context.globalCompositeOperation="source-out";

 var resdata_2=0.0;

 var center_x=160;
 var center_y=120;

 var pos1_x_ini=center_x;
 var pos1_y_ini=center_y-60;
 var pos2_x_ini=center_x+80;
 var pos2_y_ini=center_y+60;
 var pos3_x_ini=center_x-80;
 var pos3_y_ini=center_y+60;

 var pos1_x=pos1_x_ini;
 var pos1_y=pos1_y_ini;
 var pos2_x=pos2_x_ini;
 var pos2_y=pos2_y_ini;
 var pos3_x=pos3_x_ini;
 var pos3_y=pos3_y_ini;

 context.beginPath();

  context.moveTo(pos1_x,pos1_y);
  context.lineTo(pos2_x,pos2_y);
  context.lineTo(pos3_x,pos3_y);
  context.lineTo(pos1_x,pos1_y);

 for (var i=0, len=resdata.length; i< len; i++){
  resdata_2=resdata[i];

  pos1_x=pos1_x_ini-10*resdata_2.sensors.gx;
  pos1_y=pos1_y_ini+10*resdata_2.sensors.gx;
  pos2_x=pos2_x_ini+10*resdata_2.sensors.gy;
  pos2_y=pos2_y_ini+10*resdata_2.sensors.gy;
  pos3_x=pos3_x_ini+10*resdata_2.sensors.gz;
  pos3_y=pos3_y_ini-10*resdata_2.sensors.gz;

  context.moveTo(pos1_x,pos1_y);
  context.lineTo(pos2_x,pos2_y);
  context.lineTo(pos3_x,pos3_y);
  context.lineTo(pos1_x,pos1_y);


 }
  context.stroke();

}
}