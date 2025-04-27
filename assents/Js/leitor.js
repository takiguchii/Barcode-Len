const resultadoDiv = document.getElementById("resultado");

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector("#camera"),
    constraints: {
      facingMode: "environment", 
    },
  },
  decoder: {
    readers: ["ean_reader", "code_128_reader", "upc_reader"]
  },
}, function (err) {
  if (err) {
    console.error("Erro ao iniciar Quagga:", err);
    resultadoDiv.innerText = "❌ Erro ao acessar câmera.";
    return;
  }
  Quagga.start();
});

Quagga.onDetected(function (data) {
  const codigo = data.codeResult.code;
  resultadoDiv.innerText = "✅ Código lido: " + codigo;

  Quagga.stop(); // desliga a camera 

  // abre a detahes.html para mostrar as informações 
  window.location.href = `assents/Pages/detalhes.html?codigo=${codigo}`;

});
