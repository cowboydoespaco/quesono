function mostrarSugestao() {
	$('.sugestao').fadeIn('slow');
}

function mostrarForms() {
	$('.formularios').fadeIn('slow');
}

function calcularNovamente() {
	$('.sugestao').fadeOut('slow', mostrarForms);
}

function calculoAcordar(date, ciclos) {
	return new Date(date.getTime() + ciclos * 90 * 60000 + 15 * 60000);
}

function calculoDormir(date, ciclos) {
	return new Date(date.getTime() - ciclos * 90 * 60000 - 15 * 60000);
}

function formatarData(date) {
	var hh = date.getHours();
	var mm = date.getMinutes();
	if (hh < 10) {
		hh = "0" + hh;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	return hh + ":" + mm;
}

function sugerirHoraDormir() {
	var d = new Date();
	d.setUTCDate(d.getUTCDate() + 1);
	d.setHours(parseInt($('#horas').val(), 10));
	d.setMinutes(parseInt($('#minutos').val(), 10));
	$('.sugestao h2').text('Você deveria ir deitar nestes horários:');
	$('.3ciclos').text(formatarData(calculoDormir(d, 3)));
	$('.4ciclos').text(formatarData(calculoDormir(d, 4)));
	$('.5ciclos').text(formatarData(calculoDormir(d, 5)));
	$('.6ciclos').text(formatarData(calculoDormir(d, 6)));
	$('.formularios').fadeOut('slow', mostrarSugestao);
}

function sugerirHoraAcordar() {
	var d = new Date();
	$('.sugestao h2').text('Você deveria tentar acordar nestes horários:');
	$('.3ciclos').text(formatarData(calculoAcordar(d, 3)));
	$('.4ciclos').text(formatarData(calculoAcordar(d, 4)));
	$('.5ciclos').text(formatarData(calculoAcordar(d, 5)));
	$('.6ciclos').text(formatarData(calculoAcordar(d, 6)));
	$('.formularios').fadeOut('slow', mostrarSugestao);
}

$('.acordarAs').submit(function() {
	if ((parseInt($('#horas').val(), 10) >= 0 && parseInt($('#horas').val(), 10) <= 23) &&
		(parseInt($('#minutos').val(), 10) >= 0 && parseInt($('#minutos').val(), 10) <= 59)) {
		sugerirHoraDormir();
	} else {
		$('.erros').slideDown();
	}
	return false;
});

$('.dormirAgora').submit(function() {
	sugerirHoraAcordar();
	return false;
});

$('.campo-horario').keydown(function() {
	return ( event.ctrlKey || event.altKey
			|| (47<event.keyCode && event.keyCode<58 && event.shiftKey==false)
			|| (95<event.keyCode && event.keyCode<106)
			|| (event.keyCode==8) || (event.keyCode==9)
			|| (event.keyCode>34 && event.keyCode<40)
			|| (event.keyCode==46) || (event.keyCode==13)
			|| (event.keyCode==116) )
});

$('.campo-horario').focusin(function() {
	this.value = "";
});

$('#horas').keyup(function() {
	if (this.value.length == 2) {
		$('#minutos').focus();
	}
});

$('#minutos').keyup(function() {
	if (this.value.length == 2) {
		$('#btCalcularDormir').focus();
	}
});

$('#horas').focus();

$('#btCalcularNovamente').click(function() {
	$('.erros').slideUp();
	calcularNovamente();
});
