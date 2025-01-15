import jsPDF from "jspdf"

const imprimirRelatorio = () => {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(12);
    doc.text("Rua Hatfield, 680 - Centro - Juiz de Fora - MG", 20, 20);
    doc.text("Tel: (99) 99999-9999", 20, 30);
    doc.text("Código de autenticação: 2ju2bjs8s92qjsnsjs2w-2828wjwhwwjwwjh21920", 20, 40);

    // Título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Predição", 20, 60);

    // Dados do exame
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Solicitante: Enf. Valdson Silva de Macedo", 20, 80);
    doc.text("COREN: 1111111", 20, 90);
    doc.text("Data: 11-12-2025", 20, 100);
    doc.text("Instituição: UFPI", 20, 110);

    // Resultado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Resultado:", 20, 130);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Úlcera detectada (90% de acurácia)", 20, 140);

    // Recomendação
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Recomendação:", 20, 160);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Consultar um especialista para avaliação clínica detalhada.", 20, 170);

    // Assinatura eletrônica
    doc.setFontSize(12);
    doc.text("Assinatura eletrônica:", 20, 190);
    doc.text("2ju2bjs8s92qjsnsjs2w-2828wjwhwwjwwjh21920", 20, 200);

    // Rodapé
    doc.setFontSize(10);
    doc.text("www.maislaudo.com.br", 20, 270);
    doc.text("Qualquer adulteração ou rasura invalida este laudo.", 20, 280);

    // Salvar o PDF
    doc.save("relatorio_predicao.pdf");
}

export default imprimirRelatorio;
