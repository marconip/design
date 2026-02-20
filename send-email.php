<?php

$name = $_POST["name"];
$telefone = $_POST["telefone"];
$email = $_POST["email"];
$message = $_POST["message"];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Instância da classe
$mail = new PHPMailer(true);
try
{
    // Configurações do servidor
    $mail->isSMTP();        //Devine o uso de SMTP no envio
    $mail->SMTPAuth = true; //Habilita a autenticação SMTP
    $mail->Username   = 'marconiap82@gmail.com';
    $mail->Password   = 'qddt wusp pjaz ribe';

    // Criptografia do envio SSL também é aceito
    $mail->SMTPSecure = 'tls';
    // Informações específicadas pelo Google
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;

    // Destinatário
    $mail->addAddress("marconiap82@gmail.com", "Marconi Design");
    
    // Com cópia para
    $mail->AddCC('marconidesenhos@gmail.com', 'Assistente');

    // A quem responder
    $mail->addReplyTo($email, $name);

    // Ajustes de caracteres 
    $mail->CharSet = 'UTF-8';

    // Conteúdo da mensagem
    $mail->isHTML(true);  // Seta o formato do e-mail para aceitar conteúdo HTML
    $mail->Subject = $name;
    $mail->Body = "<b>Remetente:</b> ";
    $mail->Body .= $name;
    $mail->Body .= "<br /> <b>Telefone:</b> ";
    $mail->Body .= $telefone;
    $mail->Body .= "<br /> <b>E-mail:</b> ";
    $mail->Body .= $email;
    $mail->Body .= "<br /> <b>Mensagem:</b> <br />";
    $mail->Body .= $message;
    $mail->Body .= "<br /><br /> Este e-mail foi enviado através do formulário no site: Marconi Design";

    // Enviar
    $mail->send();
    header("Location: sent.html");
}
catch (Exception $e)
{
    echo "Desculpe! A mensagem não pode ser enviada. Erro: {$mail->ErrorInfo}";
}

?>