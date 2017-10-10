<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

	function vardump() {
	    $args = func_get_args();
	    print("\n<pre style=\"text-align: left;\">");
	    foreach ($args as $arg) {
	      print(var_export($arg, true)."\n");
	    }
	    print("</pre>\n");
	}


//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'PHPMailer/PHPMailerAutoload.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.mailgun.org';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "postmaster@ml.dev.bz";

//Password to use for SMTP authentication
$mail->Password = "20a5036263d435a24d8cfb051d9af466";

//Set who the message is to be sent from
$mail->setFrom('support@matterlist.com', 'Matterlist');

//Set an alternative reply-to address
$mail->addReplyTo('support@matterlist.com', 'Matterlist');

//Set who the message is to be sent to
// $mail->addAddress('support@matterlist.com', '');
$mail->addAddress('vpetrenko@gmail.com', '');
$mail->addAddress('shugar348@gmail.com', '');


$mail->setLanguage('ru');

//Set the subject line
$mail->Subject = 'Matterlist contact form';


$mail->isHTML(false);

$form_name = $_POST['name'];
$form_contact = $_POST['contact'];
$form_message = $_POST['message'];

if ($form_name == '') {
    echo "{\"status\": 2, \"error\": \"Name is empty\"}";
    exit();
}
if ($form_contact == '') {
    echo "{\"status\": 2, \"error\": \"Email is empty\"}";
    exit();
}
if ($form_message == '') {
    echo "{\"status\": 2, \"error\": \"Message is empty\"}";
    exit();
}


$form_body = "New request from $form_name ($form_contact) \n $form_message";


//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->Body = $form_body;

//Attach an image file
// $mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo "{\"status\": 1, \"error\": \"" . $mail->ErrorInfo . "\"}";
} else {
    echo "{\"status\": 0}";
}
?>
