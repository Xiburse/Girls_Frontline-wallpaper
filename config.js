// 启动（关闭）人型
var start = true;

// 有问题的人型按照给出的格式添加到任意位置
var pc = new Array("MP41", "4type", "06TypeSMG", "Magal", "Dorothy", "Jill", "RPK16", "SEI");

// 人型跳跃时的初速度（单位大概是像素吧）
var jump_speed = 10;

// 人型跳跃时的加速度（单位大概也是像素吧）
var jump_acceleration = 0.5;

// 人型的放大倍率
var double = 1.2;

// 壁纸地址（将壁纸图片放到项目image文件夹然后填相对路径就行了）
var background_url = "image/background.jpg";

// 开启（关闭）壁纸
var start_background = false;

// 开启（关闭）战斗（战斗没有鼠标事件）
var battle = true;

// 开启（关闭）视差背景（不知道在想啥）
var start_Transparent = true;

// 视差背景的视差程度（范围为0-1，0为没有视差，1为最大值）
var parallax = 0.1;

// 开启（关闭）时钟
var start_time = true;

// 屏幕上人型的数量
var quantity = 5;

// 三个时间组件的外边距，会设置的自己设置8（不过一般都不会出问题的）
var time_margin = "10% 10% auto auto";

var time_day_margin = "1% calc(10% + 5px) auto auto";

var time_week_margin = "1% 10% auto auto";

// 人型与下边框的间距（单位是像素，一般五十左右就好了）
var spacing = 0;