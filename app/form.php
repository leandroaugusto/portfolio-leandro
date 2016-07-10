<?php
    $date = date("d/m/Y h:i");

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $textodamensagem = $_POST['mensagem'];

    $nome_do_site="Leandro Augusto - Front-end Developer";
    $email_para_onde_vai_a_mensagem = "leandroacosta2008@gmail.com";
    $nome_de_quem_recebe_a_mensagem = "Leandro Augusto";
    $exibir_apos_enviar='enviado.html';

    $cabecalho_da_mensagem_original="From: $name <$email>\n";
    $assunto_da_mensagem_original="Contato portfólio";

    $configuracao_da_mensagem_original="

    Enviado por:\n
    Nome: $nome\n
    Email: $email\n
    Mensagem: $textodamensagem\n
    Enviado em: $date

    ";


    $assunto_da_mensagem_de_resposta = "Contato recebido!";
    $cabecalho_da_mensagem_de_resposta = "From: $nome_do_site < $email_para_onde_vai_a_mensagem>\n";
    $configuracao_da_mensagem_de_resposta="Obrigado pelo contato.\nResponderei assim que puder.\nAtenciosamente,\n\n$nome_do_site\n\nEnviado em: $date";


    $assunto_digitado_pelo_usuario="s";

    $headers = "$cabecalho_da_mensagem_original";
    $assunto = "$assunto_da_mensagem_original";
    $seuemail = "$email_para_onde_vai_a_mensagem";
    $mensagem = "$configuracao_da_mensagem_original";
    mail($seuemail,$assunto,$mensagem,$headers);

    $headers = "$cabecalho_da_mensagem_de_resposta";
    if($assunto_digitado_pelo_usuario=="n"){
        $assunto = "$assunto_da_mensagem_de_resposta";
    }else{
        $assunto = "Re: Leandro Augusto - Front-end Developer";
    }

    $mensagem = "$configuracao_da_mensagem_de_resposta";
    mail($email,$assunto,$mensagem,$headers);
    echo "<script>alert('Contato enviado com sucesso!'); window.location = 'index.html';</script>";

?>
