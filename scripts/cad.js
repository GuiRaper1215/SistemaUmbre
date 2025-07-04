// Formatação de CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

// Formatação de telefone
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
});

// Preview da foto
document.getElementById('photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('photoPreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        };
        reader.readAsDataURL(file);
    }
});

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cpf[9]) !== digit1) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cpf[10]) === digit2;
}

// Validação de telefone
function validatePhone(phone) {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
}

// Validação do formulário
function validateForm() {
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    // Validação de email
    if (!validateEmail(email)) {
        alert('Por favor, insira um email válido.');
        return false;
    }
    
    // Validação de CPF
    if (!validateCPF(cpf)) {
        alert('Por favor, insira um CPF válido.');
        return false;
    }
    
    // Validação de telefone
    if (!validatePhone(phone)) {
        alert('Por favor, insira um telefone válido no formato (11) 99999-9999.');
        return false;
    }
    
    // Validação de idade mínima
    if (age < 18) {
        alert('O colaborador deve ter pelo menos 18 anos.');
        return false;
    }
    
    // Validação de data de início
    const startDate = new Date(document.getElementById('startDate').value);
    if (startDate < today) {
        alert('A data de início não pode ser anterior à data atual.');
        return false;
    }
    
    return true;
}

// Coleta dados do formulário
function collectFormData() {
    const formData = new FormData();
    
    // Dados pessoais
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('cpf', document.getElementById('cpf').value);
    formData.append('birthDate', document.getElementById('birthDate').value);
    
    // Dados profissionais
    formData.append('department', document.getElementById('department').value);
    formData.append('position', document.getElementById('position').value);
    formData.append('startDate', document.getElementById('startDate').value);
    formData.append('clearanceLevel', document.getElementById('clearanceLevel').value);
    
    // Outros dados
    formData.append('address', document.getElementById('address').value);
    formData.append('observations', document.getElementById('observations').value);
    
    // Foto
    const photo = document.getElementById('photo').files[0];
    if (photo) {
        formData.append('photo', photo);
    }
    
    return formData;
}

// Simulação de envio para o servidor
function sendToServer(formData) {
    return new Promise((resolve, reject) => {
        // Simular delay de rede
        setTimeout(() => {
            // Simular sucesso (95% das vezes)
            if (Math.random() > 0.05) {
                resolve({
                    success: true,
                    message: 'Colaborador cadastrado com sucesso!',
                    employeeId: 'EMP' + Math.floor(Math.random() * 10000)
                });
            } else {
                reject(new Error('Erro no servidor. Tente novamente.'));
            }
        }, 2000);
    });
}

// Submissão do formulário
document.getElementById('employeeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validar formulário
    if (!validateForm()) {
        return;
    }
    
    // Mostrar loading
    document.getElementById('loading').style.display = 'flex';
    
    try {
        // Coletar dados
        const formData = collectFormData();
        
        // Enviar para o servidor
        const response = await sendToServer(formData);
        
        // Esconder loading
        document.getElementById('loading').style.display = 'none';
        
        // Mostrar sucesso
        document.getElementById('successMessage').style.display = 'block';
        
        // Log dos dados (para desenvolvimento)
        console.log('Dados enviados:', {
            nome: formData.get('firstName') + ' ' + formData.get('lastName'),
            email: formData.get('email'),
            departamento: formData.get('department'),
            cargo: formData.get('position'),
            nivelAcesso: formData.get('clearanceLevel')
        });
        
        // Esconder mensagem de sucesso após 3 segundos
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
            clearForm();
        }, 3000);
        
    } catch (error) {
        // Esconder loading
        document.getElementById('loading').style.display = 'none';
        
        // Mostrar erro
        alert('Erro ao cadastrar colaborador: ' + error.message);
    }
});

// Função para limpar formulário
function clearForm() {
    document.getElementById('employeeForm').reset();
    document.getElementById('photoPreview').innerHTML = '📷';
}

// Definir data mínima para data de início (hoje)
document.getElementById('startDate').min = new Date().toISOString().split('T')[0];

// Definir data máxima para data de nascimento (18 anos atrás)
const maxBirthDate = new Date();
maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);
document.getElementById('birthDate').max = maxBirthDate.toISOString().split('T')[0];

// Auto-focus no primeiro campo
document.getElementById('firstName').focus();

// Adicionar asterisco vermelho aos campos obrigatórios
document.addEventListener('DOMContentLoaded', function() {
    const requiredLabels = document.querySelectorAll('label');
    requiredLabels.forEach(label => {
        if (label.textContent.includes('*')) {
            label.innerHTML = label.innerHTML.replace('*', '<span style="color: #ff0000;">*</span>');
        }
    });
});

// Função para exportar dados (opcional)
function exportEmployeeData() {
    const formData = collectFormData();
    const data = {
        nome: formData.get('firstName') + ' ' + formData.get('lastName'),
        email: formData.get('email'),
        telefone: formData.get('phone'),
        cpf: formData.get('cpf'),
        nascimento: formData.get('birthDate'),
        departamento: formData.get('department'),
        cargo: formData.get('position'),
        inicioTrabalho: formData.get('startDate'),
        nivelAcesso: formData.get('clearanceLevel'),
        endereco: formData.get('address'),
        observacoes: formData.get('observations'),
        dataHoraCadastro: new Date().toISOString()
    };
    
    console.log('Dados do colaborador:', data);
    return data;
}