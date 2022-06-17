class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}
}


class Bd{
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){
		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i<= id; i++){
			let despesa = JSON.parse(localStorage.getItem(i))

			//existe a possibilidades de ter itens que foram removidos??
			if(despesa === null){
				continue
			}

			despesa.id = i
			despesas.push(despesa)
		}
			return despesas
	}

		pesquisar(despesa){

			let despesasFiltradas = Array()

			despesasFiltradas = this.recuperarTodosRegistros()
			
			console.log(despesa)
			console.log(despesasFiltradas)


			/*
			-Na parte de cima foi criado um Array que pegas as informações do Array() que 
			ja existia;
			
			-Na parte da pesquisa, foi adicionando um "filter" no Array() recem criado, 
			fazendo uma comparação da informação dos dois Arrays
			*/

			//Ano
			if(despesa.ano != ''){
				console.log('Filtro de Ano')
				despesasFiltradas =  despesasFiltradas.filter(d => d.ano == despesa.ano)
			}

			//Mês
			if(despesa.mes != ''){
				console.log('Filtro de Mes')
				despesasFiltradas =  despesasFiltradas.filter(d => d.mes == despesa.mes)
			}

			//Dia
			if(despesa.dia != ''){
				console.log('Filtro de Dia')
				despesasFiltradas =  despesasFiltradas.filter(d => d.dia == despesa.dia)
			}

			//Tipo
			if(despesa.tipo != ''){
				console.log('Filtro de Tipo')
				despesasFiltradas =  despesasFiltradas.filter(d => d.tipo == despesa.tipo)
			}

			//Descrição
			if(despesa.descricao != ''){
				console.log('Filtro de Descricão')
				despesasFiltradas =  despesasFiltradas.filter(d => d.descricao == despesa.descricao)
			}

			//Valor
			if(despesa.valor != ''){
				console.log('Filtro de Valor')
				despesasFiltradas =  despesasFiltradas.filter(d => d.valor == despesa.valor)
			}

			return despesasFiltradas
		}

		remover(id){
			localStorage.removeItem(id)
		}
}

let bd = new Bd()






function cadastrarDespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo =  document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')


	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

	despesa.validarDados()

	if(despesa.validarDados()){
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro Incluido com Sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-sucess'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className =  'btn btn-success'


		$('#modalRegistraDespesa').modal('show')

		ano.value = ''
		mes.value = ''
		dia .value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	}else{
		//Dialogo de Erro
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos com sucesso'
		document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'
		document.getElementById('modal_btn').className =  'btn btn-danger'


		$('#modalRegistraDespesa').modal('show')
	}
}






function carregaListaDespesas(){
	//Aqui criamos uma variavel chamada despesas que recebe as informações que vem da função
	let despesas = Array()

	despesas = bd.recuperarTodosRegistros()

	console.log(despesas)

	//selecionando o elemento Tbody da tabela
	var listaDespesas = document.getElementById('listaDespesas')

	/*
	<tr>
                <td>15/03/2018</td>
                <td>Alimentação</td>
                <td>Compras</td>
                <td>500</td>
              </tr>
	*/


	//percorrer o Array() despesas, listando cada despesa de forma dinamica
	despesas.forEach(function(d){

		//console.log(d)

		//criando as linhas <tr>
		let linha = listaDespesas.insertRow()

		//cria as colunas <td>
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

		//ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo
		
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//criar botão de exclusão
		let btn = document.createElement("button")
		btn.className = 'btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){
			//remover despesa
			let id = this.id.replace('id_despesa_', '')

			bd.remover(id)

			window.location.reload()
		}
		linha.insertCell(4).append(btn)

		console.log(d)
	})
}





function pesquisarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


	let despesas = bd.pesquisar(despesa)

	//Selecionando o elemento Tbody da
	var listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	/*
	<tr>
                <td>15/03/2018</td>
                <td>Alimentação</td>
                <td>Compras</td>
                <td>500</td>
              </tr>
	*/


	//percorrer o Array() despesas, listando cada despesa de forma dinamica
	despesas.forEach(function(d){

		//console.log(d)

		//criando as linhas <tr>
		let linha = listaDespesas.insertRow()

		//cria as colunas <td>
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

		//ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo
		
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})
}

	

