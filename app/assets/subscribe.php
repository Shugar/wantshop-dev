<?php
header('Content-Type: application/json');
// TODO: Comment this line for production:
//header('Access-Control-Allow-Origin: *');

//fill in these values for with your own information
$api_key = 'c5e1a7ace9e2b31c890ba70b081688b7-us16';
$datacenter = 'us16';
$list_id = '493da66db2';
$email = $_POST['email'];
$status = 'pending';
//if(!empty($_POST['status'])){
//    $status = $_POST['status'];
//}
$url = 'https://'.$datacenter.'.api.mailchimp.com/3.0/lists/'.$list_id.'/members/';
$username = 'apikey';
$password = $api_key;
$data = array("email_address" => $email,"status" => $status);
$data_string = json_encode($data);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$api_key");
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
);
$result=curl_exec ($ch);
curl_close ($ch);
echo $result;
?>
