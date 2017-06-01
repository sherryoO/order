/* 声明一个数组用来存input值 */
var array = ["", ""];
/*方法调用*/
inputFn("#username", 0);
inputFn("#mima", 1);
/* 方法封装 */
/*键盘弹起时实时生效*/
function inputFn(ele, num) {
	$(ele).keyup(function() {
		var val = $(this).val().trim();
		console.log(val);
		array[num] = val;
		inputArray();
	});
}
/*遍历数组，判断input值是否存在于数组中*/
function inputArray() {
	for(var i = 0, arrayLen = array.length; i < arrayLen; i++) {
		//  如果值不在数组中 就返回 并 去掉颜色
		if(array[i] == "" || 　array[i] == null) {
			$("button").removeClass("sub");
			console.log(array[i] + "无法提交" + i)
			return;
		}
	}
	//
	$("button").addClass("sub");
}
//登录提交
$("button").click(function() {
	var str = "";
	if(array[0] == "" || array[1] == "") {
		str = "请填写您的用户名或密码"
		$(".notice").html(str).css("opacity", 1);
	}else{
		alert("y")
		// ajax({
			
		// })
	}

})