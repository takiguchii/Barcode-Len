
const resultadoDiv = document.getElementById("resultado");

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector("#camera"),
    constraints: {
      facingMode: "environment", // câmera traseira em celular
    },
  },
  decoder: {
    readers: ["ean_reader", "code_128_reader", "upc_reader"] // pode adicionar mais se quiser
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

  // Parar após leitura bem-sucedida (opcional)
  Quagga.stop();
});
