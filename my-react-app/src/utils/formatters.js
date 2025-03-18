export const toFormattedCpf = (cpf) => {
  
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const toFormatteDate = (data) => {
    const extracted_date = data.split("T")
    const parts_of_date = extracted_date[0].split("-")

    return `${parts_of_date[2]}/${parts_of_date[1]}/${parts_of_date[0]}`
}