import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// --- Textos para Internacionalização (i18n) ---
const translations = {
    pt: {
        title: "ClarezaFy teste 123",
        subtitle: "Números claros, decisões lucrativas.",
        monthAnalysis: "Mês de Análise:",
        noMonthToShow: "Nenhum mês para exibir.",
        addNewMonth: "Adicionar Novo Mês",
        summaryOf: "Resumo de",
        totalRevenue: "Receita Total",
        totalCost: "Custo Total",
        finalResult: "Resultado",
        profitMargin: "Margem de Lucro",
        profit: "Lucro",
        loss: "Prejuízo",
        monthlyRevenue: "Faturamento Mensal",
        totalValue: "Valor Total",
        fixedCosts: "Custos Fixos",
        addFixedCost: "Adicionar Custo Fixo",
        variableCosts: "Custos Variáveis",
        addVariableCost: "Adicionar Custo Variável",
        description: "Descrição",
        add: "Adicionar",
        costDetails: "Detalhamento dos Custos",
        totalFixed: "Total Fixo:",
        totalVariable: "Total Variável:",
        totalOperationalCost: "Custo Operacional Total:",
        longTermAnalysis: "Análise a Longo Prazo",
        monthlyFinancialEvolution: "Evolução Financeira Mensal",
        month: "Mês",
        revenue: "Receita",
        result: "Resultado",
        actions: "Ações",
        deletedMonthsHistory: "Histórico de Meses Apagados",
        restore: "Restaurar",
        addMonthModalTitle: "Adicionar Novo Mês de Análise",
        year: "Ano",
        cancel: "Cancelar",
        monthAlreadyAdded: "Este mês já foi adicionado.",
        language: "Idioma",
        currency: "Moeda",
        theme: "Tema",
        light: "Claro",
        dark: "Escuro",
        welcomeTitle: "Bem-vindo!",
        welcomeSubtitle: "A sua calculadora está pronta. Comece por adicionar o primeiro mês.",
        manageData: "Gerir Dados",
        exportData: "Exportar",
        importData: "Importar",
        generatePDF: "Gerar Relatório PDF",
        generatingPDF: "A gerar PDF...",
        pdfResourcesError: "Recursos para PDF ainda a carregar. Por favor, tente novamente em breve.",
        pdfGenerationError: "Ocorreu um erro ao gerar o PDF.",
        usageInstruction: "Dica: Selecione um mês e preencha o faturamento e os custos. Os resultados são atualizados automaticamente.",
        footerText: "Todos os direitos reservados Leandro Morais",
        monthlyRevenueTooltip: "É tudo o que a sua empresa faturou no mês com as vendas, antes de descontar qualquer gasto.",
        fixedCostsTooltip: "São as contas que você paga todo mês, não importa se vendeu muito ou pouco. Ex: Aluguel, salários, internet.",
        variableCostsTooltip: "São os gastos que aumentam quando você vende mais. Ex: Matéria-prima, embalagens, comissões de venda.",
        totalRevenueTooltip: "Soma de todo o dinheiro que entrou no mês através das suas vendas.",
        totalCostTooltip: "Soma de todos os custos, tanto os fixos como os variáveis.",
        finalResultTooltip: "É o resultado final da sua empresa: Receita Total menos o Custo Total. Mostra se teve lucro ou prejuízo.",
        profitMarginTooltip: "É a porcentagem do seu faturamento que sobrou como lucro. (Resultado / Receita Total) * 100.",
        breakEvenPoint: "Ponto de Equilíbrio",
        breakEvenPointTooltip: "É o faturamento mínimo que você precisa atingir para cobrir todos os seus custos. A partir deste valor, sua empresa começa a ter lucro.",
        longTermAnalysisTooltip: "Acompanhe o desempenho financeiro da sua empresa ao longo dos meses para identificar tendências e tomar melhores decisões.",
        costDetailsTooltip: "Aqui pode ver a soma separada dos seus custos fixos e variáveis, e o custo total da sua operação no mês.",
        fullMonths: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    },
    en: {
        title: "ClarezaFy",
        subtitle: "Clear numbers, profitable decisions.",
        monthAnalysis: "Analysis Month:",
        noMonthToShow: "No month to display.",
        addNewMonth: "Add New Month",
        summaryOf: "Summary of",
        totalRevenue: "Total Revenue",
        totalCost: "Total Cost",
        finalResult: "Final Result",
        profitMargin: "Profit Margin",
        profit: "Profit",
        loss: "Loss",
        monthlyRevenue: "Monthly Billings",
        totalValue: "Total Value",
        fixedCosts: "Fixed Costs",
        addFixedCost: "Add Fixed Cost",
        variableCosts: "Variable Costs",
        addVariableCost: "Add Variable Cost",
        description: "Description",
        add: "Add",
        costDetails: "Cost Breakdown",
        totalFixed: "Total Fixed:",
        totalVariable: "Total Variable:",
        totalOperationalCost: "Total Operational Cost:",
        longTermAnalysis: "Long-Term Analysis",
        monthlyFinancialEvolution: "Monthly Financial Evolution",
        month: "Month",
        revenue: "Revenue",
        result: "Result",
        actions: "Actions",
        deletedMonthsHistory: "Deleted Months History",
        restore: "Restore",
        addMonthModalTitle: "Add New Analysis Month",
        year: "Year",
        cancel: "Cancel",
        monthAlreadyAdded: "This month has already been added.",
        language: "Language",
        currency: "Currency",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        welcomeTitle: "Welcome!",
        welcomeSubtitle: "Your calculator is ready. Get started by adding the first month.",
        manageData: "Manage Data",
        exportData: "Export",
        importData: "Import",
        generatePDF: "Generate PDF Report",
        generatingPDF: "Generating PDF...",
        pdfResourcesError: "PDF resources are still loading. Please try again shortly.",
        pdfGenerationError: "An error occurred while generating the PDF.",
        usageInstruction: "Tip: Select a month and fill in the billings and costs. The results update automatically.",
        footerText: "All rights reserved Leandro Morais",
        monthlyRevenueTooltip: "The total gross amount earned from sales in the month, before any deductions.",
        fixedCostsTooltip: "The bills you pay every month, no matter how much you sell. E.g., Rent, salaries, internet.",
        variableCostsTooltip: "Expenses that increase as you sell more. E.g., Raw materials, packaging, sales commissions.",
        totalRevenueTooltip: "The sum of all money that came in during the month from your sales.",
        totalCostTooltip: "The sum of all your costs, both fixed and variable.",
        finalResultTooltip: "Your company's bottom line: Total Revenue minus Total Cost. It shows if you made a profit or a loss.",
        profitMarginTooltip: "The percentage of your revenue that was left as profit. (Final Result / Total Revenue) * 100.",
        breakEvenPoint: "Break-Even Point",
        breakEvenPointTooltip: "The minimum revenue you need to achieve to cover all your costs. Above this value, your company starts to make a profit.",
        longTermAnalysisTooltip: "Track your company's financial performance over the months to identify trends and make better decisions.",
        costDetailsTooltip: "Here you can see the separate sum of your fixed and variable costs, and the total operational cost for the month.",
        fullMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
};

// --- Componentes de Ícones ---
const currencyConfig = { BRL: { locale: 'pt-BR', symbol: 'R$' }, USD: { locale: 'en-US', symbol: '$' }, EUR: { locale: 'de-DE', symbol: '€' } };
const PlusCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const TrashIcon = ({...props}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors cursor-pointer"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>;
const RestoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 15a10 10 0 1 1-10-10" /><polyline points="21 8 21 15 14 15" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>;
const LoaderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;

// --- Componente de Tooltip (Dica de Ajuda) ---
const InfoTooltip = ({ text, position = 'center' }) => {
    const positionClasses = { center: 'left-1/2 -translate-x-1/2', left: 'right-0' };
    return (<div className="group relative flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500 cursor-pointer"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg><div className={`absolute bottom-full mb-2 w-64 bg-slate-800 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 ${positionClasses[position]}`}>{text}</div></div>);
};

// --- Componente de Input Monetário ---
const CurrencyInput = ({ value, onValueChange, locale, currency }) => {
    const [displayValue, setDisplayValue] = useState('0,00');
    useEffect(() => { setDisplayValue(new Intl.NumberFormat(locale, { minimumFractionDigits: 2 }).format(value || 0)); }, [value, locale]);
    const handleChange = (e) => onValueChange(Number(e.target.value.replace(/\D/g, '')) / 100);
    return <input type="text" value={displayValue} onChange={handleChange} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200" placeholder={currencyConfig[currency].symbol + " 0,00"}/>;
};

// --- Modal para Adicionar Novo Mês ---
const AddMonthModal = ({ isOpen, onClose, onAddMonth, t }) => {
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    if (!isOpen) return null;
    const handleSubmit = () => { onAddMonth(mes, ano); onClose(); };
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"><div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md"><h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">{t('addMonthModalTitle')}</h2><div className="space-y-4"><div><label htmlFor="select-mes" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('month')}</label><select id="select-mes" value={mes} onChange={(e) => setMes(Number(e.target.value))} className="mt-1 block w-full p-2 border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200">{t('fullMonths').map((nome, index) => <option key={index} value={index + 1}>{nome}</option>)}</select></div><div><label htmlFor="input-ano" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('year')}</label><input type="number" id="input-ano" value={ano} onChange={(e) => setAno(Number(e.target.value))} className="mt-1 block w-full p-2 border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200" placeholder="Ex: 2024" /></div></div><div className="mt-6 flex justify-end space-x-3"><button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500">{t('cancel')}</button><button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{t('add')}</button></div></div></div>;
};

// --- Componente do Relatório para PDF ---
const ReportTemplate = ({ data, t, formatCurrency, formatDateDisplay, chartData, theme, resultado, custoTotal, totalCustosFixos, totalCustosVariaveis, margemDeLucro, pontoDeEquilibrio }) => {
    if (!data) return null;
    const { receita, custosFixos, custosVariaveis, nome } = data;
    const chartAxisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const chartGridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <div id="pdf-report" className={`p-8 font-sans ${theme === 'dark' ? 'dark bg-slate-900 text-slate-200' : 'bg-white text-gray-800'}`} style={{ width: '800px' }}>
            <header className="text-center mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t('title')}</h1>
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-4">{t('summaryOf')} {formatDateDisplay(nome, 'full')}</h2>
            </header>

            <main>
                <section className="mb-8">
                    <div className="grid grid-cols-5 gap-4 text-center">
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">{t('totalRevenue')}</h3><p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">{formatCurrency(receita)}</p></div>
                        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg"><h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">{t('totalCost')}</h3><p className="text-2xl font-bold text-orange-900 dark:text-orange-200 mt-1">{formatCurrency(custoTotal)}</p></div>
                        <div className={`p-4 rounded-lg ${resultado >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}><h3 className={`text-sm font-medium ${resultado >= 0 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>{t('finalResult')}</h3><p className={`text-2xl font-bold ${resultado >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-1`}>{formatCurrency(resultado)}</p></div>
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg"><h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">{t('breakEvenPoint')}</h3><p className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1">{pontoDeEquilibrio > 0 ? formatCurrency(pontoDeEquilibrio) : '--'}</p></div>
                        <div className={`p-4 rounded-lg ${margemDeLucro >= 0 ? 'bg-teal-50 dark:bg-teal-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}><h3 className={`text-sm font-medium ${margemDeLucro >= 0 ? 'text-teal-800 dark:text-teal-300' : 'text-red-800 dark:text-red-300'}`}>{t('profitMargin')}</h3><p className={`text-2xl font-bold ${margemDeLucro >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'} mt-1`}>{margemDeLucro.toFixed(2)}%</p></div>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('fixedCosts')}</h3>
                        <div className="space-y-2">{(custosFixos || []).map((c, i) => <div key={`fixo-pdf-${i}`} className="flex justify-between bg-slate-50 dark:bg-slate-700/50 p-2 rounded-md"><span>{c.nome}</span><span className="font-semibold">{formatCurrency(c.valor)}</span></div>)}</div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('variableCosts')}</h3>
                        <div className="space-y-2">{(custosVariaveis || []).map((c, i) => <div key={`var-pdf-${i}`} className="flex justify-between bg-slate-50 dark:bg-slate-700/50 p-2 rounded-md"><span>{c.nome}</span><span className="font-semibold">{formatCurrency(c.valor)}</span></div>)}</div>
                    </div>
                </section>

                <section className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-8">
                       <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{t('costDetails')}</h3>
                       <div className="space-y-2"><div className="flex justify-between"><span>{t('totalFixed')}</span><span className="font-bold">{formatCurrency(totalCustosFixos)}</span></div><div className="flex justify-between"><span>{t('totalVariable')}</span><span className="font-bold">{formatCurrency(totalCustosVariaveis)}</span></div><div className="border-t my-2 border-slate-200 dark:border-slate-700"></div><div className="flex justify-between text-lg"><span className="font-semibold">{t('totalOperationalCost')}</span><span className="font-bold text-orange-600 dark:text-orange-400">{formatCurrency(custoTotal)}</span></div></div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-800 dark:text-slate-100">{t('monthlyFinancialEvolution')}</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <LineChart width={730} height={350} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} /><XAxis dataKey="name" tick={{ fill: chartAxisColor }} /><YAxis tickFormatter={(v) => new Intl.NumberFormat(currencyConfig['BRL'].locale, { style: "currency", currency: 'BRL', notation: "compact" }).format(v)} tick={{ fill: chartAxisColor }} /><Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }} formatter={(v, n) => [formatCurrency(v), n]} /><Legend wrapperStyle={{color: chartAxisColor}}/><ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" /><Line isAnimationActive={false} type="monotone" dataKey={t('revenue')} stroke="#3b82f6" strokeWidth={2} /><Line isAnimationActive={false} type="monotone" dataKey={t('totalCost')} stroke="#f97316" strokeWidth={2} /><Line isAnimationActive={false} type="monotone" dataKey={t('result')} stroke={resultado >= 0 ? '#22c55e' : '#ef4444'} strokeWidth={2} />
                        </LineChart>
                    </div>
                </section>
            </main>
            <footer className="text-center mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} {t('footerText')}</p>
            </footer>
        </div>
    );
};


// --- Componente principal da Aplicação ---
export default function App() {
    const [language, setLanguage] = useState('pt');
    const [currency, setCurrency] = useState('BRL');
    const [theme, setTheme] = useState('light');
    const [historicoFinanceiro, setHistoricoFinanceiro] = useState([]);
    const [historicoApagado, setHistoricoApagado] = useState([]);
    const [mesSelecionadoIndex, setMesSelecionadoIndex] = useState(0);
    const [novoCustoFixo, setNovoCustoFixo] = useState({ nome: '', valor: 0 });
    const [novoCustoVariavel, setNovoCustoVariavel] = useState({ nome: '', valor: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const fileInputRef = useRef(null);

    // Carrega scripts para PDF
    useEffect(() => {
        const loadScript = (id, src) => new Promise((resolve, reject) => {
            if (document.getElementById(id)) return resolve();
            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.body.appendChild(script);
        });
        Promise.all([
            loadScript('jspdf', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
            loadScript('html2canvas', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
        ]).then(() => setScriptsLoaded(true)).catch(error => console.error(error));
    }, []);

    // Aplica a classe do tema no elemento raiz
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    // Carrega dados do localStorage ao iniciar
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('calculadoraLucratividadeData');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                setLanguage(parsed.language || 'pt');
                setCurrency(parsed.currency || 'BRL');
                setTheme(parsed.theme || 'light');
                setHistoricoFinanceiro(parsed.historicoFinanceiro || []);
                setHistoricoApagado(parsed.historicoApagado || []);
                setMesSelecionadoIndex(0);
            }
        } catch (error) { console.error("Erro ao carregar dados:", error); }
    }, []);

    // Salva dados no localStorage sempre que houver mudança
    useEffect(() => {
        try {
            const dataToSave = { language, currency, theme, historicoFinanceiro, historicoApagado };
            localStorage.setItem('calculadoraLucratividadeData', JSON.stringify(dataToSave));
        } catch (error) { console.error("Erro ao salvar dados:", error); }
    }, [language, currency, theme, historicoFinanceiro, historicoApagado]);

    const t = (key) => translations[language][key] || key;
    const formatCurrency = (value) => new Intl.NumberFormat(currencyConfig[currency].locale, { style: 'currency', currency: currency }).format(value || 0);
    
    const formatDateDisplay = (dateString, type) => {
        if (!dateString) return "";
        const [month, year] = dateString.split('/');
        const monthIndex = parseInt(month, 10) - 1;
        if (type === 'full') return `${t('fullMonths')[monthIndex]} ${language === 'pt' ? 'de' : ''} ${year}`;
        if (type === 'short') return `${t('shortMonths')[monthIndex]}/${year}`;
        return dateString;
    };

    const sortHistorico = (a, b) => new Date(`${a.nome.split('/')[1]}-${a.nome.split('/')[0]}-01`) - new Date(`${b.nome.split('/')[1]}-${b.nome.split('/')[0]}-01`);
    const dadosMesAtual = useMemo(() => historicoFinanceiro[mesSelecionadoIndex], [historicoFinanceiro, mesSelecionadoIndex]);

    const handleAddCusto = (tipo) => {
        const custo = tipo === 'fixo' ? novoCustoFixo : novoCustoVariavel;
        if (!dadosMesAtual || !custo.nome || custo.valor <= 0) return;
        const novosCustos = tipo === 'fixo' ? [...(dadosMesAtual.custosFixos || []), custo] : [...(dadosMesAtual.custosVariaveis || []), custo];
        const novoHistorico = [...historicoFinanceiro];
        novoHistorico[mesSelecionadoIndex] = { ...dadosMesAtual, [tipo === 'fixo' ? 'custosFixos' : 'custosVariaveis']: novosCustos };
        setHistoricoFinanceiro(novoHistorico);
        if (tipo === 'fixo') setNovoCustoFixo({ nome: '', valor: 0 }); else setNovoCustoVariavel({ nome: '', valor: 0 });
    };
    
    const handleRemoveCusto = (tipo, index) => {
        if (!dadosMesAtual) return;
        const custosAtuais = tipo === 'fixo' ? dadosMesAtual.custosFixos : dadosMesAtual.custosVariaveis;
        const novosCustos = custosAtuais.filter((_, i) => i !== index);
        const novoHistorico = [...historicoFinanceiro];
        novoHistorico[mesSelecionadoIndex] = { ...dadosMesAtual, [tipo === 'fixo' ? 'custosFixos' : 'custosVariaveis']: novosCustos };
        setHistoricoFinanceiro(novoHistorico);
    };

    const handleAdicionarMes = (mes, ano) => {
        const proximoMesNome = `${mes.toString().padStart(2, '0')}/${ano}`;
        if (historicoFinanceiro.some(h => h.nome === proximoMesNome)) return alert(t('monthAlreadyAdded'));
        const ultimoMes = historicoFinanceiro[historicoFinanceiro.length - 1];
        const novoMes = { nome: proximoMesNome, receita: 0, custosFixos: (ultimoMes?.custosFixos || []), custosVariaveis: [] };
        const historicoOrdenado = [...historicoFinanceiro, novoMes].sort(sortHistorico);
        setHistoricoFinanceiro(historicoOrdenado);
        setMesSelecionadoIndex(historicoOrdenado.findIndex(h => h.nome === proximoMesNome));
    };
    
    const handleRemoveMes = (indexToRemove) => {
        const mesApagado = historicoFinanceiro[indexToRemove];
        setHistoricoApagado([...historicoApagado, mesApagado].sort(sortHistorico));
        const novoHistorico = historicoFinanceiro.filter((_, i) => i !== indexToRemove);
        setHistoricoFinanceiro(novoHistorico);
        setMesSelecionadoIndex(novoHistorico.length > 0 ? Math.max(0, indexToRemove - 1) : 0);
    };
    
    const handleRestoreMes = (indexToRestore) => {
        const mesRestaurado = historicoApagado[indexToRestore];
        setHistoricoApagado(historicoApagado.filter((_, i) => i !== indexToRestore));
        const historicoOrdenado = [...historicoFinanceiro, mesRestaurado].sort(sortHistorico);
        setHistoricoFinanceiro(historicoOrdenado);
        setMesSelecionadoIndex(historicoOrdenado.findIndex(h => h.nome === mesRestaurado.nome));
    };

    const handleExport = () => {
        const dataStr = localStorage.getItem('calculadoraLucratividadeData');
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'calculadora_dados.json');
        linkElement.click();
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const parsed = JSON.parse(text);
                setLanguage(parsed.language || 'pt');
                setCurrency(parsed.currency || 'BRL');
                setTheme(parsed.theme || 'light');
                setHistoricoFinanceiro(parsed.historicoFinanceiro || []);
                setHistoricoApagado(parsed.historicoApagado || []);
                setMesSelecionadoIndex(0);
            } catch (error) { console.error("Erro ao importar arquivo:", error); alert("Arquivo de importação inválido."); }
        };
        reader.readAsText(file);
        event.target.value = null;
    };

    const handleGeneratePdf = async () => {
        if (!scriptsLoaded) { alert(t('pdfResourcesError')); return; }
        const reportElement = document.getElementById('pdf-report');
        if (!reportElement) return;
        setIsGeneratingPdf(true);
        try {
            const { jsPDF } = window.jspdf;
            const canvas = await window.html2canvas(reportElement, { scale: 2, backgroundColor: null });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            const date = formatDateDisplay(dadosMesAtual.nome, 'full').replace(/ /g, '_');
            pdf.save(`Relatorio-ClarezaFy-${date}.pdf`);
        } catch (error) { console.error("Erro ao gerar PDF:", error); alert(t('pdfGenerationError')); }
        finally { setIsGeneratingPdf(false); }
    };
    
    const { receita, custosFixos, custosVariaveis } = dadosMesAtual || {};
    const totalCustosFixos = useMemo(() => (custosFixos || []).reduce((acc, c) => acc + c.valor, 0), [custosFixos]);
    const totalCustosVariaveis = useMemo(() => (custosVariaveis || []).reduce((acc, c) => acc + c.valor, 0), [custosVariaveis]);
    const custoTotal = useMemo(() => totalCustosFixos + totalCustosVariaveis, [totalCustosFixos, totalCustosVariaveis]);
    const resultado = useMemo(() => (receita || 0) - custoTotal, [receita, custoTotal]);
    const margemDeLucro = useMemo(() => (!receita || receita === 0) ? 0 : (resultado / receita) * 100, [resultado, receita]);
    
    const pontoDeEquilibrio = useMemo(() => {
        if (!receita || receita <= totalCustosVariaveis) {
            return 0;
        }
        const indiceMargemContribuicao = (receita - totalCustosVariaveis) / receita;
        if (indiceMargemContribuicao <= 0) {
            return 0;
        }
        return totalCustosFixos / indiceMargemContribuicao;
    }, [receita, totalCustosFixos, totalCustosVariaveis]);

    const chartData = useMemo(() => historicoFinanceiro.map(mesData => {
        const custoTotalMes = ((mesData.custosFixos || []).reduce((a, b) => a + b.valor, 0)) + ((mesData.custosVariaveis || []).reduce((a, b) => a + b.valor, 0));
        return { name: formatDateDisplay(mesData.nome, 'short'), [t('revenue')]: mesData.receita, [t('totalCost')]: custoTotalMes, [t('result')]: mesData.receita - custoTotalMes };
    }), [historicoFinanceiro, language]);
    
    const chartAxisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const chartGridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
            <AddMonthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddMonth={handleAdicionarMes} t={t} />
            <div style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: -10 }}><ReportTemplate data={dadosMesAtual} t={t} formatCurrency={formatCurrency} formatDateDisplay={formatDateDisplay} chartData={chartData} theme={theme} resultado={resultado} custoTotal={custoTotal} totalCustosFixos={totalCustosFixos} totalCustosVariaveis={totalCustosVariaveis} margemDeLucro={margemDeLucro} pontoDeEquilibrio={pontoDeEquilibrio} /></div>
            <div className="max-w-6xl mx-auto flex flex-col min-h-screen">
                <main className="flex-grow">
                    <header className="text-center mb-4"><h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{t('title')}</h1><p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">{t('subtitle')}</p></header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 items-center">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-4">
                            <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300 mr-2">{t('language')}:</label><select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-1 border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"><option value="pt">Português</option><option value="en">English</option></select></div>
                            <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300 mr-2">{t('currency')}:</label><select value={currency} onChange={(e) => setCurrency(e.target.value)} className="p-1 border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200">{Object.keys(currencyConfig).map(curr => <option key={curr} value={curr}>{curr}</option>)}</select></div>
                            <div><label className="text-sm font-medium text-slate-600 dark:text-slate-300 mr-2">{t('theme')}:</label><select value={theme} onChange={(e) => setTheme(e.target.value)} className="p-1 border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"><option value="light">{t('light')}</option><option value="dark">{t('dark')}</option></select></div>
                        </div>
                        <div className="flex justify-center md:justify-end items-center gap-2">
                            <button onClick={handleExport} className="flex items-center p-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 font-semibold text-sm"><DownloadIcon/>{t('exportData')}</button>
                            <button onClick={() => fileInputRef.current.click()} className="flex items-center p-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 font-semibold text-sm"><UploadIcon/>{t('importData')}</button>
                            <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json"/>
                        </div>
                    </div>
                    
                    {historicoFinanceiro.length === 0 ? (
                        <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">{t('welcomeTitle')}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">{t('welcomeSubtitle')}</p>
                            <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center mx-auto p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-sm"><CalendarIcon /> {t('addNewMonth')}</button>
                        </div>
                    ) : (
                    <>
                    <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center"><label className="text-lg font-semibold text-slate-700 dark:text-slate-200 mr-4">{t('monthAnalysis')}</label><select value={mesSelecionadoIndex} onChange={(e) => setMesSelecionadoIndex(Number(e.target.value))} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600">{historicoFinanceiro.map((mes, index) => <option key={index} value={index}>{formatDateDisplay(mes.nome, 'full')}</option>)}</select></div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-sm w-full sm:w-auto"><CalendarIcon /> {t('addNewMonth')}</button>
                    </div>
                    
                    <div className="text-center text-sm text-slate-600 dark:text-sky-300 mb-8 p-3 bg-sky-50 dark:bg-sky-900/50 rounded-lg border border-sky-200 dark:border-sky-800"><p>{t('usageInstruction')}</p></div>

                    {dadosMesAtual && (
                    <>
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('summaryOf')} {formatDateDisplay(dadosMesAtual.nome, 'full')}</h2>
                                <button onClick={handleGeneratePdf} disabled={isGeneratingPdf} className="flex items-center p-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 font-semibold text-sm disabled:bg-rose-400 disabled:cursor-wait">
                                    {isGeneratingPdf ? <LoaderIcon /> : <FileTextIcon />}
                                    {isGeneratingPdf ? t('generatingPDF') : t('generatePDF')}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><div className="flex items-center gap-2"><h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">{t('totalRevenue')}</h3><InfoTooltip text={t('totalRevenueTooltip')} /></div><p className="text-2xl xl:text-3xl font-bold text-blue-900 dark:text-blue-200 break-words mt-1">{formatCurrency(receita)}</p></div>
                                <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg"><div className="flex items-center gap-2"><h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">{t('totalCost')}</h3><InfoTooltip text={t('totalCostTooltip')} /></div><p className="text-2xl xl:text-3xl font-bold text-orange-900 dark:text-orange-200 break-words mt-1">{formatCurrency(custoTotal)}</p></div>
                                <div className={`p-4 rounded-lg ${resultado >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}><div className="flex items-center gap-2"><h3 className={`text-sm font-medium ${resultado >= 0 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>{t('finalResult')}</h3><InfoTooltip text={t('finalResultTooltip')} /></div><p className={`text-2xl xl:text-3xl font-bold ${resultado >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} break-words mt-1`}>{formatCurrency(resultado)}</p></div>
                                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg"><div className="flex items-center gap-2"><h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">{t('breakEvenPoint')}</h3><InfoTooltip text={t('breakEvenPointTooltip')} /></div><p className="text-2xl xl:text-3xl font-bold text-purple-900 dark:text-purple-200 break-words mt-1">{pontoDeEquilibrio > 0 ? formatCurrency(pontoDeEquilibrio) : '--'}</p></div>
                                <div className={`p-4 rounded-lg ${margemDeLucro >= 0 ? 'bg-teal-50 dark:bg-teal-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}><div className="flex items-center gap-2"><h3 className={`text-sm font-medium ${margemDeLucro >= 0 ? 'text-teal-800 dark:text-teal-300' : 'text-red-800 dark:text-red-300'}`}>{t('profitMargin')}</h3><InfoTooltip text={t('profitMarginTooltip')} /></div><p className={`text-2xl xl:text-3xl font-bold ${margemDeLucro >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'} break-words mt-1`}>{margemDeLucro.toFixed(2)}%</p></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-8"><div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 mb-4"><h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{t('monthlyRevenue')}</h3><InfoTooltip text={t('monthlyRevenueTooltip')} /></div><label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{t('totalValue')}</label><CurrencyInput value={receita} onValueChange={(val) => { const newHistory = [...historicoFinanceiro]; newHistory[mesSelecionadoIndex].receita = val; setHistoricoFinanceiro(newHistory); }} locale={currencyConfig[currency].locale} currency={currency}/></div><div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 mb-4"><h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{t('fixedCosts')}</h3><InfoTooltip text={t('fixedCostsTooltip')} /></div><div className="space-y-3">{(custosFixos || []).map((c, i) => <div key={`fixo-${i}`} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg"><span className="text-slate-700 dark:text-slate-300">{c.nome}</span><div className="flex items-center gap-4"><span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(c.valor)}</span><button onClick={() => handleRemoveCusto('fixo', i)}><TrashIcon /></button></div></div>)}</div><div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"><h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-3">{t('addFixedCost')}</h4><div className="flex flex-col space-y-3"><input type="text" placeholder={t('description')} value={novoCustoFixo.nome} onChange={(e) => setNovoCustoFixo({ ...novoCustoFixo, nome: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200" /><CurrencyInput value={novoCustoFixo.valor} onValueChange={(v) => setNovoCustoFixo({ ...novoCustoFixo, valor: v })} locale={currencyConfig[currency].locale} currency={currency} /><button onClick={() => handleAddCusto('fixo')} className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"><PlusCircleIcon /> {t('add')}</button></div></div></div></div>
                            <div className="space-y-8"><div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 mb-4"><h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{t('variableCosts')}</h3><InfoTooltip text={t('variableCostsTooltip')} /></div><div className="space-y-3">{(custosVariaveis || []).map((c, i) => <div key={`var-${i}`} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg"><span className="text-slate-700 dark:text-slate-300">{c.nome}</span><div className="flex items-center gap-4"><span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(c.valor)}</span><button onClick={() => handleRemoveCusto('variavel', i)}><TrashIcon /></button></div></div>)}</div><div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"><h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-3">{t('addVariableCost')}</h4><div className="flex flex-col space-y-3"><input type="text" placeholder={t('description')} value={novoCustoVariavel.nome} onChange={(e) => setNovoCustoVariavel({ ...novoCustoVariavel, nome: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200" /><CurrencyInput value={novoCustoVariavel.valor} onValueChange={(v) => setNovoCustoVariavel({ ...novoCustoVariavel, valor: v })} locale={currencyConfig[currency].locale} currency={currency} /><button onClick={() => handleAddCusto('variavel')} className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"><PlusCircleIcon /> {t('add')}</button></div></div></div><div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 mb-4"><h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{t('costDetails')}</h3><InfoTooltip text={t('costDetailsTooltip')} position="left" /></div><div className="space-y-3 text-slate-700 dark:text-slate-300"><div className="flex justify-between"><span>{t('totalFixed')}</span><span className="font-bold text-slate-800 dark:text-slate-100">{formatCurrency(totalCustosFixos)}</span></div><div className="flex justify-between"><span>{t('totalVariable')}</span><span className="font-bold text-slate-800 dark:text-slate-100">{formatCurrency(totalCustosVariaveis)}</span></div><div className="border-t my-2 border-slate-200 dark:border-slate-700"></div><div className="flex justify-between text-lg"><span className="font-semibold">{t('totalOperationalCost')}</span><span className="font-bold text-orange-600 dark:text-orange-400">{formatCurrency(custoTotal)}</span></div></div></div></div>
                        </div>
                    </>
                    )}
                    <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-6"><h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('longTermAnalysis')}</h2><InfoTooltip text={t('longTermAnalysisTooltip')} /></div>
                        <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-4">{t('monthlyFinancialEvolution')}</h3>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} /><XAxis dataKey="name" tick={{ fill: chartAxisColor }} /><YAxis tickFormatter={(v) => new Intl.NumberFormat(currencyConfig[currency].locale, { style: "currency", currency: currency, notation: "compact" }).format(v)} tick={{ fill: chartAxisColor }} /><Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }} formatter={(v, n) => [formatCurrency(v), n]} /><Legend wrapperStyle={{color: chartAxisColor}}/><ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" /><Line type="monotone" dataKey={t('revenue')} stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} /><Line type="monotone" dataKey={t('totalCost')} stroke="#f97316" strokeWidth={2} /><Line type="monotone" dataKey={t('result')} stroke={resultado >= 0 ? '#22c55e' : '#ef4444'} strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="overflow-x-auto mt-8">
                            <table className="w-full text-left"><thead className="bg-slate-100 dark:bg-slate-700"><tr><th className="p-3 font-semibold text-slate-800 dark:text-slate-200">{t('month')}</th><th className="p-3 font-semibold text-right text-slate-800 dark:text-slate-200">{t('revenue')}</th><th className="p-3 font-semibold text-right text-slate-800 dark:text-slate-200">{t('totalCost')}</th><th className="p-3 font-semibold text-right text-slate-800 dark:text-slate-200">{t('result')}</th><th className="p-3 font-semibold text-center text-slate-800 dark:text-slate-200">{t('actions')}</th></tr></thead><tbody>{(historicoFinanceiro || []).map((mesData, index) => {const cTotal = ((mesData.custosFixos || []).reduce((a, b) => a + b.valor, 0)) + ((mesData.custosVariaveis || []).reduce((a, b) => a + b.valor, 0)); const res = mesData.receita - cTotal; return (<tr key={index} className="border-b last:border-none border-slate-200 dark:border-slate-700"><td className="p-3 font-medium text-slate-700 dark:text-slate-300">{formatDateDisplay(mesData.nome, 'short')}</td><td className="p-3 text-blue-700 dark:text-blue-400 text-right">{formatCurrency(mesData.receita)}</td><td className="p-3 text-orange-700 dark:text-orange-400 text-right">{formatCurrency(cTotal)}</td><td className={`p-3 font-bold text-right ${res >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatCurrency(res)}</td><td className="p-3 text-center flex justify-center"><TrashIcon onClick={() => handleRemoveMes(index)} /></td></tr>)})}</tbody></table>
                        </div>
                    </div>
                    {historicoApagado.length > 0 && (
                        <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100">{t('deletedMonthsHistory')}</h2>
                            <div className="space-y-3">
                                {historicoApagado.map((mes, index) => (<div key={`apagado-${index}`} className="flex items-center justify-between bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg"><span className="font-medium text-slate-700 dark:text-slate-300">{formatDateDisplay(mes.nome, 'full')}</span><button onClick={() => handleRestoreMes(index)} className="flex items-center p-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold text-sm"><RestoreIcon /> {t('restore')}</button></div>))}
                            </div>
                        </div>
                    )}
                    </>
                    )}
                </main>
                <footer className="text-center mt-12 py-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} {t('footerText')}
                    </p>
                </footer>
            </div>
        </div>
    );
}
