const _supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

let count = 0;
function incrementWork() {
    count++;
    document.getElementById('workCount').innerText = count;
    const display = document.getElementById('workCount');
    display.style.background = '#C5192D';
    display.style.color = 'white';
    setTimeout(() => {
        display.style.background = '#fdf0f1';
        display.style.color = '#C5192D';
    }, 300);
}

async function finalizarDia() {
    const trabalho = document.getElementById('workCount').innerText;

    const bloco2 = Array.from(document.querySelectorAll('#bloco2 input:checked'))
        .map(i => i.closest('.cb-container').querySelector('.label-text').innerText).join(', ');

    const bloco3 = Array.from(document.querySelectorAll('#bloco3 input:checked'))
        .map(i => i.closest('.cb-container').querySelector('.label-text').innerText).join(', ');

    const { data, error } = await _supabase
        .from('history')
        .insert([
            {
                job: parseInt(trabalho),
                primary: bloco2,
                secondary: bloco3
            }
        ]);

    if (error) {
        console.error("Failed to save:", error);
        alert("Error: " + error.message);
    } else {
        alert("Progress saved! 🇨🇦");
        count = 0; 
        document.getElementById('workCount').innerText = count;
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    }
}

function renderizar(dados) {
    const display = document.getElementById('display-resultado');
    if (!dados || dados.length === 0) {
        display.innerHTML = "❌ No records found.";
        return;
    }

    display.innerHTML = dados.map(item => `
        <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            <strong style="color: #C5192D;">📅 Date: ${new Date(item.created_at).toLocaleDateString('pt-BR')}</strong><br>
            <strong>📈 Job:</strong> ${item.work} tasks<br>
            <strong>✅ Main:</strong> ${item.primary || 'Nenhum'}<br>
            <strong>🌲 Secundary:</strong> ${item.secondary || 'Nenhum'}
        </div>
    `).join('');
}

async function carregarDiaAnterior() {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    const dataFormatada = ontem.toISOString().split('T')[0];

    const { data } = await _supabase
        .from('history')
        .select('*')
        .gte('created_at', `${dataFormatada}T00:00:00`)
        .lte('created_at', `${dataFormatada}T23:59:59`);

    renderizar(data);
}

async function buscarDataEspecifica() {
    const dataBusca = document.getElementById('filtroData').value;
    if (!dataBusca) return alert("Select a date!");

    const { data } = await _supabase
        .from('history')
        .select('*')
        .gte('created_at', `${dataBusca}T00:00:00`)
        .lte('created_at', `${dataBusca}T23:59:59`);

    renderizar(data);
}

async function buscarPeriodo() {
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;

    if (!inicio || !fim) return alert("Select both dates!");

    const { data } = await _supabase
        .from('history')
        .select('*')
        .gte('created_at', `${inicio}T00:00:00`)
        .lte('created_at', `${fim}T23:59:59`)
        .order('created_at', { ascending: false });

    renderizar(data);
}

window.onload = carregarDiaAnterior;

