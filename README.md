req.session.user: contem as informaçoes do usuario antes de fazer o cadastro

req.session.firstStep: verifica se o usuario passou pelo primeiro passo (validação), e permite que ele acesse a pagina sign-up/confirmacao

                req.flash('loginSucess', ['Usuário logado com sucesso!'])
