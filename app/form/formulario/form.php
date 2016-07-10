<?php
    $date = date("d/m/Y h:i");

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $cidade = $_POST['cidade'];
    $textodamensagem = $_POST['textodamensagem'];

    $nome_do_site="Seu Site";
    $email_para_onde_vai_a_mensagem = "seunome@seuemail.com.br";
    $nome_de_quem_recebe_a_mensagem = "Seu Nome";
    $exibir_apos_enviar='enviado.html';

    $cabecalho_da_mensagem_original="From: $name <$email>\n";
    $assunto_da_mensagem_original="Contato no Site";

    $configuracao_da_mensagem_original="

    ENVIADO POR:\n
    Nome: $nome\n
    Email: $email\n
    Telefone: $telefone\n
    Cidade: $cidade\n
    Mensagem: $textodamensagem\n
    ENVIADO EM: $date

    ";


    $assunto_da_mensagem_de_resposta = "Confirmação";
    $cabecalho_da_mensagem_de_resposta = "From: $nome_do_site < $email_para_onde_vai_a_mensagem>\n";
    $configuracao_da_mensagem_de_resposta="Obrigado por entrar em contato!\nEstaremos respondendo em breve...\nAtenciosamente,\n$nome_do_site\n\nEnviado em: $date";


    $assunto_digitado_pelo_usuario="s";

    $headers = "$cabecalho_da_mensagem_original";

    if($assunto_digitado_pelo_usuario=="n"){
    $assunto = "$assunto_da_mensagem_original";
    }
    $seuemail = "$email_para_onde_vai_a_mensagem";
    $mensagem = "$configuracao_da_mensagem_original";
    mail($seuemail,$assunto,$mensagem,$headers);

    $headers = "$cabecalho_da_mensagem_de_resposta";
    if($assunto_digitado_pelo_usuario=="n"){
    $assunto = "$assunto_da_mensagem_de_resposta";
    }else{
    $assunto = "Re: $assunto";
    }

    $mensagem = "$configuracao_da_mensagem_de_resposta";
    mail($email,$assunto,$mensagem,$headers);
    echo "<script>window.location='$exibir_apos_enviar'</script>";

?>
