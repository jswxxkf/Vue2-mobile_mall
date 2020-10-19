<?php
use dao\UserDAO;

// 1. 取出post请求头中的参数 并构造相应的可变函数形式
$entity = $_GET['entity'] . 'DAO';
$oper = $_GET['oper'];
$userInfo = $_GET['userInfo'];  // expected: array

echo $entity . ' ; ' . $oper . '  ';
echo $userInfo;
// 2. 调用DAO中的相应方法
//$dao = new $entity($userInfo);
//$dao->$oper();
