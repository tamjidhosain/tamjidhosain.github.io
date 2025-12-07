// ===== GLOBAL VARIABLES =====
let rawData = [];
let filteredData = [];
let charts = {};

// ===== CONFIGURATION =====
const CHART_COLORS = {
    primary: '#2E5BFF',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#06B6D4',
    purple: '#A855F7',
    pink: '#EC4899',
    gradient: {
        blue: 'rgba(46, 91, 255, 0.8)',
        purple: 'rgba(139, 92, 246, 0.8)',
        blueBg: 'rgba(46, 91, 255, 0.1)',
        purpleBg: 'rgba(139, 92, 246, 0.1)'
    }
};

const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#F8FAFC',
                font: { family: 'Inter, sans-serif', size: 12 }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#F8FAFC',
            bodyColor: '#CBD5E1',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8
        }
    },
    scales: {
        x: {
            ticks: { color: '#CBD5E1' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        y: {
            ticks: { color: '#CBD5E1' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
    }
};

// ===== DATA LOADING & PROCESSING =====
async function loadData() {
    try {
        const response = await fetch('marketing_data.csv');
        const csvText = await response.text();
        rawData = parseCSV(csvText);
        filteredData = [...rawData];

        processData();
        populateFilters();
        updateDashboard();
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load marketing data. Please ensure marketing_data.csv is in the same directory.');
    }
}

function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const row = {};

        headers.forEach((header, index) => {
            let value = values[index]?.trim() || '';

            // Convert numeric fields
            if (['Year_Birth', 'Income', 'Kidhome', 'Teenhome', 'Recency',
                'MntWines', 'MntFruits', 'MntMeatProducts', 'MntFishProducts',
                'MntSweetProducts', 'MntGoldProds', 'NumDealsPurchases',
                'NumWebPurchases', 'NumCatalogPurchases', 'NumStorePurchases',
                'NumWebVisitsMonth', 'AcceptedCmp1', 'AcceptedCmp2', 'AcceptedCmp3',
                'AcceptedCmp4', 'AcceptedCmp5', 'Response', 'Complain'].includes(header)) {
                value = parseFloat(value) || 0;
            }

            row[header] = value;
        });

        return row;
    });
}

function processData() {
    filteredData.forEach(customer => {
        // Calculate derived metrics
        customer.Age = 2025 - customer.Year_Birth;
        customer.TotalSpending = (customer.MntWines || 0) + (customer.MntFruits || 0) +
            (customer.MntMeatProducts || 0) + (customer.MntFishProducts || 0) +
            (customer.MntSweetProducts || 0) + (customer.MntGoldProds || 0);
        customer.TotalPurchases = (customer.NumWebPurchases || 0) + (customer.NumCatalogPurchases || 0) +
            (customer.NumStorePurchases || 0);
        customer.CampaignAcceptances = (customer.AcceptedCmp1 || 0) + (customer.AcceptedCmp2 || 0) +
            (customer.AcceptedCmp3 || 0) + (customer.AcceptedCmp4 || 0) +
            (customer.AcceptedCmp5 || 0) + (customer.Response || 0);

        // Segmentation
        if (customer.TotalSpending >= 1500) customer.Segment = 'Premium';
        else if (customer.TotalSpending >= 500) customer.Segment = 'High Value';
        else if (customer.TotalSpending >= 100) customer.Segment = 'Medium Value';
        else customer.Segment = 'Low Value';
    });
}

// ===== FILTERS =====
function populateFilters() {
    const countries = [...new Set(rawData.map(c => c.Country))].filter(Boolean).sort();
    const education = [...new Set(rawData.map(c => c.Education))].filter(Boolean).sort();
    const segments = ['Premium', 'High Value', 'Medium Value', 'Low Value'];

    populateSelect('countryFilter', countries);
    populateSelect('educationFilter', education);
    populateSelect('segmentFilter', segments);
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

function applyFilters() {
    const country = document.getElementById('countryFilter').value;
    const education = document.getElementById('educationFilter').value;
    const segment = document.getElementById('segmentFilter').value;

    filteredData = rawData.filter(customer => {
        return (country === 'all' || customer.Country === country) &&
            (education === 'all' || customer.Education === education) &&
            (segment === 'all' || customer.Segment === segment);
    });

    updateDashboard();
}

function resetFilters() {
    document.getElementById('countryFilter').value = 'all';
    document.getElementById('educationFilter').value = 'all';
    document.getElementById('segmentFilter').value = 'all';
    filteredData = [...rawData];
    updateDashboard();
}

// ===== KPI CALCULATIONS =====
function calculateKPIs() {
    const totalCustomers = filteredData.length;
    const totalRevenue = filteredData.reduce((sum, c) => sum + c.TotalSpending, 0);
    const totalPurchases = filteredData.reduce((sum, c) => sum + c.TotalPurchases, 0);
    const estimatedCost = totalCustomers * 10;

    const campaignRevenue = filteredData
        .filter(c => c.CampaignAcceptances > 0)
        .reduce((sum, c) => sum + c.TotalSpending, 0);

    const roas = estimatedCost > 0 ? campaignRevenue / estimatedCost : 0;
    const customerLTV = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
    const avgOrderValue = totalPurchases > 0 ? totalRevenue / totalPurchases : 0;

    const totalCampaignAcceptances = filteredData.reduce((sum, c) => sum + c.CampaignAcceptances, 0);
    const campaignSuccessRate = totalCampaignAcceptances / (totalCustomers * 6);

    return {
        totalCustomers,
        totalRevenue,
        roas,
        customerLTV,
        campaignSuccessRate,
        avgOrderValue
    };
}

function updateKPIs() {
    const kpis = calculateKPIs();

    document.getElementById('totalCustomers').textContent = kpis.totalCustomers.toLocaleString();
    document.getElementById('totalRevenue').textContent = '$' + kpis.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 });
    document.getElementById('roas').textContent = kpis.roas.toFixed(2) + 'x';
    document.getElementById('customerLTV').textContent = '$' + kpis.customerLTV.toLocaleString(undefined, { maximumFractionDigits: 0 });
    document.getElementById('campaignSuccess').textContent = (kpis.campaignSuccessRate * 100).toFixed(1) + '%';
    document.getElementById('avgOrderValue').textContent = '$' + kpis.avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 });

    // Update ROAS indicator
    const roasIndicator = document.getElementById('roasIndicator');
    if (kpis.roas >= 3.0) {
        roasIndicator.textContent = '🚀 Excellent';
        roasIndicator.className = 'kpi-change positive';
    } else if (kpis.roas >= 2.0) {
        roasIndicator.textContent = '📈 Good';
        roasIndicator.className = 'kpi-change neutral';
    } else {
        roasIndicator.textContent = '⚠️ Needs Improvement';
        roasIndicator.className = 'kpi-change negative';
    }
}

// ===== CHART 1: CAMPAIGN PERFORMANCE =====
function createCampaignChart() {
    const ctx = document.getElementById('campaignChart');

    const campaigns = [
        { name: 'Campaign 1', field: 'AcceptedCmp1' },
        { name: 'Campaign 2', field: 'AcceptedCmp2' },
        { name: 'Campaign 3', field: 'AcceptedCmp3' },
        { name: 'Campaign 4', field: 'AcceptedCmp4' },
        { name: 'Campaign 5', field: 'AcceptedCmp5' },
        { name: 'Response', field: 'Response' }
    ];

    const data = campaigns.map(campaign => {
        const acceptances = filteredData.reduce((sum, c) => sum + (c[campaign.field] || 0), 0);
        return (acceptances / filteredData.length) * 100;
    });

    if (charts.campaign) charts.campaign.destroy();

    charts.campaign = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: campaigns.map(c => c.name),
            datasets: [{
                label: 'Acceptance Rate (%)',
                data: data,
                backgroundColor: [
                    CHART_COLORS.gradient.blue,
                    CHART_COLORS.gradient.purple,
                    CHART_COLORS.success,
                    CHART_COLORS.warning,
                    CHART_COLORS.info,
                    CHART_COLORS.pink
                ],
                borderColor: [
                    CHART_COLORS.primary,
                    CHART_COLORS.secondary,
                    CHART_COLORS.success,
                    CHART_COLORS.warning,
                    CHART_COLORS.info,
                    CHART_COLORS.pink
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                legend: { display: false }
            },
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    beginAtZero: true,
                    ticks: {
                        ...chartConfig.scales.y.ticks,
                        callback: value => value + '%'
                    }
                }
            }
        }
    });
}

// ===== CHART 2: CUSTOMER SEGMENTATION =====
function createSegmentationChart() {
    const ctx = document.getElementById('segmentationChart');

    const segments = {
        'Premium': filteredData.filter(c => c.Segment === 'Premium').length,
        'High Value': filteredData.filter(c => c.Segment === 'High Value').length,
        'Medium Value': filteredData.filter(c => c.Segment === 'Medium Value').length,
        'Low Value': filteredData.filter(c => c.Segment === 'Low Value').length
    };

    if (charts.segmentation) charts.segmentation.destroy();

    charts.segmentation = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(segments),
            datasets: [{
                data: Object.values(segments),
                backgroundColor: [
                    CHART_COLORS.secondary,
                    CHART_COLORS.primary,
                    CHART_COLORS.success,
                    CHART_COLORS.neutral || '#6B7280'
                ],
                borderColor: '#0F172A',
                borderWidth: 3
            }]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                legend: {
                    ...chartConfig.plugins.legend,
                    position: 'bottom'
                }
            }
        }
    });
}

// ===== CHART 3: PURCHASE CHANNELS =====
function createChannelChart() {
    const ctx = document.getElementById('channelChart');

    const webPurchases = filteredData.reduce((sum, c) => sum + c.NumWebPurchases, 0);
    const catalogPurchases = filteredData.reduce((sum, c) => sum + c.NumCatalogPurchases, 0);
    const storePurchases = filteredData.reduce((sum, c) => sum + c.NumStorePurchases, 0);
    const total = webPurchases + catalogPurchases + storePurchases;

    if (charts.channel) charts.channel.destroy();

    charts.channel = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Web', 'Catalog', 'Store'],
            datasets: [{
                label: 'Purchase Share (%)',
                data: [
                    (webPurchases / total * 100).toFixed(1),
                    (catalogPurchases / total * 100).toFixed(1),
                    (storePurchases / total * 100).toFixed(1)
                ],
                backgroundColor: [CHART_COLORS.gradient.blue, CHART_COLORS.gradient.purple, CHART_COLORS.success],
                borderColor: [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.success],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            ...chartConfig,
            indexAxis: 'y',
            plugins: {
                ...chartConfig.plugins,
                legend: { display: false }
            },
            scales: {
                x: {
                    ...chartConfig.scales.x,
                    ticks: {
                        ...chartConfig.scales.x.ticks,
                        callback: value => value + '%'
                    }
                },
                y: chartConfig.scales.y
            }
        }
    });
}

// ===== CHART 4: PRODUCT CATEGORY REVENUE =====
function createProductChart() {
    const ctx = document.getElementById('productChart');

    const products = {
        'Wine': filteredData.reduce((sum, c) => sum + c.MntWines, 0),
        'Meat': filteredData.reduce((sum, c) => sum + c.MntMeatProducts, 0),
        'Fish': filteredData.reduce((sum, c) => sum + c.MntFishProducts, 0),
        'Sweets': filteredData.reduce((sum, c) => sum + c.MntSweetProducts, 0),
        'Fruits': filteredData.reduce((sum, c) => sum + c.MntFruits, 0),
        'Gold': filteredData.reduce((sum, c) => sum + c.MntGoldProds, 0)
    };

    // Sort by revenue
    const sortedProducts = Object.entries(products).sort((a, b) => b[1] - a[1]);

    if (charts.product) charts.product.destroy();

    charts.product = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedProducts.map(p => p[0]),
            datasets: [{
                label: 'Revenue ($)',
                data: sortedProducts.map(p => p[1]),
                backgroundColor: CHART_COLORS.gradient.purple,
                borderColor: CHART_COLORS.secondary,
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            ...chartConfig,
            indexAxis: 'y',
            plugins: {
                ...chartConfig.plugins,
                legend: { display: false }
            }
        }
    });
}

// ===== CHART 5: INCOME VS SPENDING SCATTER =====
function createScatterChart() {
    const ctx = document.getElementById('scatterChart');

    const segmentColors = {
        'Premium': CHART_COLORS.secondary,
        'High Value': CHART_COLORS.primary,
        'Medium Value': CHART_COLORS.success,
        'Low Value': CHART_COLORS.neutral || '#6B7280'
    };

    const datasets = Object.keys(segmentColors).map(segment => ({
        label: segment,
        data: filteredData
            .filter(c => c.Segment === segment && c['Income '] > 0)
            .map(c => ({ x: c['Income '], y: c.TotalSpending })),
        backgroundColor: segmentColors[segment] + '80',
        borderColor: segmentColors[segment],
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
    }));

    if (charts.scatter) charts.scatter.destroy();

    charts.scatter = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            ...chartConfig,
            scales: {
                x: {
                    ...chartConfig.scales.x,
                    title: { display: true, text: 'Income ($)', color: '#CBD5E1' }
                },
                y: {
                    ...chartConfig.scales.y,
                    title: { display: true, text: 'Total Spending ($)', color: '#CBD5E1' }
                }
            }
        }
    });
}

// ===== CHART 6: GEOGRAPHIC DISTRIBUTION =====
function createGeoChart() {
    const ctx = document.getElementById('geoChart');

    const countries = {};
    filteredData.forEach(c => {
        if (c.Country) {
            countries[c.Country] = (countries[c.Country] || 0) + 1;
        }
    });

    const sortedCountries = Object.entries(countries).sort((a, b) => b[1] - a[1]);

    if (charts.geo) charts.geo.destroy();

    charts.geo = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedCountries.map(c => c[0]),
            datasets: [{
                label: 'Customers',
                data: sortedCountries.map(c => c[1]),
                backgroundColor: CHART_COLORS.gradient.blue,
                borderColor: CHART_COLORS.primary,
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                legend: { display: false }
            }
        }
    });
}

// ===== CHART 7: EDUCATION DISTRIBUTION =====
function createEducationChart() {
    const ctx = document.getElementById('educationChart');

    const education = {};
    filteredData.forEach(c => {
        if (c.Education) {
            education[c.Education] = (education[c.Education] || 0) + 1;
        }
    });

    if (charts.education) charts.education.destroy();

    charts.education = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(education),
            datasets: [{
                data: Object.values(education),
                backgroundColor: [
                    CHART_COLORS.primary,
                    CHART_COLORS.secondary,
                    CHART_COLORS.success,
                    CHART_COLORS.warning,
                    CHART_COLORS.info
                ],
                borderColor: '#0F172A',
                borderWidth: 3
            }]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                legend: {
                    ...chartConfig.plugins.legend,
                    position: 'bottom'
                }
            }
        }
    });
}

// ===== CHART 8: CUSTOMER ACQUISITION TREND =====
function createTrendChart() {
    const ctx = document.getElementById('trendChart');

    const monthlyData = {};
    filteredData.forEach(c => {
        if (c.Dt_Customer) {
            const month = c.Dt_Customer.substring(0, 7);
            monthlyData[month] = (monthlyData[month] || 0) + 1;
        }
    });

    const sortedMonths = Object.keys(monthlyData).sort();

    if (charts.trend) charts.trend.destroy();

    charts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedMonths,
            datasets: [{
                label: 'New Customers',
                data: sortedMonths.map(m => monthlyData[m]),
                borderColor: CHART_COLORS.primary,
                backgroundColor: CHART_COLORS.gradient.blueBg,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            ...chartConfig,
            plugins: {
                ...chartConfig.plugins,
                legend: { display: false }
            }
        }
    });
}

// ===== INSIGHTS =====
function updateInsights() {
    // Top Campaign  
    const campaigns = [
        { name: 'Campaign 1', count: filteredData.reduce((s, c) => s + c.AcceptedCmp1, 0) },
        { name: 'Campaign 2', count: filteredData.reduce((s, c) => s + c.AcceptedCmp2, 0) },
        { name: 'Campaign 3', count: filteredData.reduce((s, c) => s + c.AcceptedCmp3, 0) },
        { name: 'Campaign 4', count: filteredData.reduce((s, c) => s + c.AcceptedCmp4, 0) },
        { name: 'Campaign 5', count: filteredData.reduce((s, c) => s + c.AcceptedCmp5, 0) }
    ];
    const topCampaign = campaigns.sort((a, b) => b.count - a.count)[0];
    document.getElementById('topCampaign').textContent =
        `${topCampaign.name} with ${topCampaign.count} acceptances (${((topCampaign.count / filteredData.length) * 100).toFixed(1)}% rate)`;

    // Top Segment
    const segments = {
        'Premium': filteredData.filter(c => c.Segment === 'Premium').length,
        'High Value': filteredData.filter(c => c.Segment === 'High Value').length,
        'Medium Value': filteredData.filter(c => c.Segment === 'Medium Value').length,
        'Low Value': filteredData.filter(c => c.Segment === 'Low Value').length
    };
    const topSegment = Object.entries(segments).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('topSegment').textContent =
        `${topSegment[0]} segment with ${topSegment[1]} customers (${((topSegment[1] / filteredData.length) * 100).toFixed(1)}%)`;

    // Top Channel
    const webPurchases = filteredData.reduce((s, c) => s + c.NumWebPurchases, 0);
    const catalogPurchases = filteredData.reduce((s, c) => s + c.NumCatalogPurchases, 0);
    const storePurchases = filteredData.reduce((s, c) => s + c.NumStorePurchases, 0);
    const channels = { Web: webPurchases, Catalog: catalogPurchases, Store: storePurchases };
    const topChannel = Object.entries(channels).sort((a, b) => b[1] - a[1])[0];
    const totalPurchases = webPurchases + catalogPurchases + storePurchases;
    document.getElementById('topChannel').textContent =
        `${topChannel[0]} with ${topChannel[1].toLocaleString()} purchases (${((topChannel[1] / totalPurchases) * 100).toFixed(1)}%)`;

    // Top Product
    const products = {
        'Wine': filteredData.reduce((s, c) => s + c.MntWines, 0),
        'Meat': filteredData.reduce((s, c) => s + c.MntMeatProducts, 0),
        'Fish': filteredData.reduce((s, c) => s + c.MntFishProducts, 0),
        'Sweets': filteredData.reduce((s, c) => s + c.MntSweetProducts, 0),
        'Fruits': filteredData.reduce((s, c) => s + c.MntFruits, 0),
        'Gold': filteredData.reduce((s, c) => s + c.MntGoldProds, 0)
    };
    const topProduct = Object.entries(products).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('topProduct').textContent =
        `${topProduct[0]} generating $${topProduct[1].toLocaleString()} in revenue`;
}

// ===== MAIN UPDATE FUNCTION =====
function updateDashboard() {
    updateKPIs();
    createCampaignChart();
    createSegmentationChart();
    createChannelChart();
    createProductChart();
    createScatterChart();
    createGeoChart();
    createEducationChart();
    createTrendChart();
    updateInsights();
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.getElementById('countryFilter').addEventListener('change', applyFilters);
    document.getElementById('educationFilter').addEventListener('change', applyFilters);
    document.getElementById('segmentFilter').addEventListener('change', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
});
