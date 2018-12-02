<?php
include("../res/x5engine.php");
$nameList = array("ctz","m47","aa4","mef","hh3","vzv","wuh","63h","86y","yrd");
$charList = array("3","8","H","P","7","J","X","4","2","6");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
