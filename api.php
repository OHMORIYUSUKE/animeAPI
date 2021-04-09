<?php
$json = array(
    array('name'=>'Google', 'url'=>'https://www.google.co.jp/'),
);
array_push($json,array('name'=>'Yahoo!', 'url'=>'http://www.yahoo.co.jp/'),);
 
header("Content-Type: text/javascript; charset=utf-8");
echo json_encode($json); // 配列をJSON形式に変換してくれる
exit();
?>