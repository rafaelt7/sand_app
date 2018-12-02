<?php
include("../res/x5engine.php");
$nameList = array("m8k","mfn","2ry","ah6","6s8","xw3","aml","tpr","exv","hhj");
$charList = array("7","M","M","3","8","2","N","K","H","A");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
