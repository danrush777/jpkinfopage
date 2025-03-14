document.addEventListener('DOMContentLoaded', function() {
    // Chart.js Animationsoptionen global setzen
    Chart.defaults.animation = {
        duration: 2000,
        easing: 'easeOutQuart'
    };
    // Daten für die Übersicht 2024
    const data2024 = {
        labels: ['Neuwagen', 'Gebrauchtwagen'],
        datasets: [{
            label: 'Fahrzeugkäufe 2024 in Baden-Württemberg',
            data: [404124, 866720],
            backgroundColor: [
                'rgba(28, 63, 96, 0.8)',
                'rgba(55, 93, 129, 0.8)'
            ],
            borderColor: [
                'rgba(28, 63, 96, 1)',
                'rgba(55, 93, 129, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Daten für Neuwagenantriebe
    const dataNeuwagenAntriebe = {
        labels: ['Batterie-PKW', 'Plug-in Hybride', 'Hybride ohne Stecker', 'Benziner & Diesel'],
        datasets: [{
            label: 'Neuwagenantriebe 2024',
            data: [66479, 39770, 113857, 184018], // 45,2% von 404.124 = ca. 184.018
            backgroundColor: [
                'rgba(28, 63, 96, 0.8)',
                'rgba(55, 93, 129, 0.8)',
                'rgba(84, 125, 163, 0.8)',
                'rgba(165, 177, 194, 0.8)'
            ],
            borderWidth: 0
        }]
    };

    // Daten für Gebrauchtwagenantriebe
    const dataGebrauchtwagenAntriebe = {
        labels: ['E-Autos', 'Verbrenner & Andere'],
        datasets: [{
            label: 'Gebrauchtwagenantriebe 2024',
            data: [25658, 841062], // 3% vs 97% (von 866.720)
            backgroundColor: [
                'rgba(28, 63, 96, 0.85)',
                'rgba(165, 177, 194, 0.85)'
            ],
            borderWidth: 0
        }]
    };

    // Daten für Ausbildung
    const dataAusbildung = {
        labels: ['Kfz-Mechatroniker', 'Automobilkaufleute', 'Andere'],
        datasets: [{
            label: 'Neue Ausbildungsverträge 2024',
            data: [3249, 882, 453], // 4.584 Gesamt - 3.249 - 882 = 453
            backgroundColor: [
                'rgba(28, 63, 96, 0.85)',
                'rgba(55, 93, 129, 0.85)',
                'rgba(84, 125, 163, 0.85)'
            ],
            borderWidth: 0
        }]
    };

    // Prognose für 2025
    const data2025 = {
        labels: ['Neuwagen', 'Gebrauchtwagen'],
        datasets: [{
            label: 'Prognose Fahrzeugkäufe 2025',
            data: [404124, 905000], // Neuwagen konstant, Gebrauchtwagen +4-5%
            backgroundColor: [
                'rgba(28, 63, 96, 0.85)',
                'rgba(55, 93, 129, 0.85)'
            ],
            borderColor: [
                'rgba(28, 63, 96, 1)',
                'rgba(55, 93, 129, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Elektromobilitätsentwicklung 2023/2024
    const elektroEntwicklungData = {
        labels: ['E-Auto Neuzulassungen', 'E-Auto Gebrauchtwagen'],
        datasets: [
            {
                label: '2023',
                data: [84472, 14270], // Werte berechnet anhand der prozentualen Veränderungen
                backgroundColor: 'rgba(204, 204, 204, 0.6)',
                borderWidth: 0
            },
            {
                label: '2024',
                data: [66479, 25658],
                backgroundColor: 'rgba(28, 63, 96, 0.8)',
                borderWidth: 0
            }
        ]
    };
    
    // Vergleichsdaten E-Mobilität 2024/2025
    const comparisonData = {
        labels: ['E-Auto Neuzulassungen', 'E-Auto Gebrauchtwagen'],
        datasets: [
            {
                label: '2024',
                data: [66479, 25658],
                backgroundColor: 'rgba(28, 63, 96, 0.8)',
                borderWidth: 0
            },
            {
                label: '2025 (Prognose)',
                data: [66479, 38487], // Annahme: E-Autos Neuwagen stabil, Gebrauchtwagen +50%
                backgroundColor: 'rgba(55, 93, 129, 0.8)',
                borderWidth: 0
            }
        ]
    };

    // Chart-Konfigurationen
    const pieChartConfig = {
        type: 'pie',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const dataset = context.dataset;
                            const total = dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    };

    const barChartConfig = {
        type: 'bar',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return value / 1000000 + ' Mio';
                            } else if (value >= 1000) {
                                return value / 1000 + ' Tsd';
                            }
                            return value;
                        }
                    }
                }
            }
        }
    };

    const doughnutChartConfig = {
        type: 'doughnut',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const dataset = context.dataset;
                            const total = dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    };

    // Chart-Objekte erstellen
    // Chart-Instanzen in Objekten speichern für Animation
    let chart2024Instance = null;
    let chartNeuwagenAntriebeInstance = null;
    let chartGebrauchtwagenAntriebeInstance = null;
    let chartAusbildungInstance = null;
    let chart2025Instance = null;
    let elektroEntwicklungChartInstance = null;
    let comparisonChartInstance = null;
    
    // Renderfunktion für Chart 2024, wird erst aufgerufen, wenn sichtbar
    function renderChart2024() {
        if (chart2024Instance) return; // Bereits gerendert
        
        const ctx = document.getElementById('chart2024');
        // Animation so einstellen, dass Balken von unten wachsen
        chart2024Instance = new Chart(ctx, {
            type: 'bar',
            data: data2024,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // Legende ausblenden
                    },
                    title: {
                        display: true,
                        text: 'Fahrzeugkäufe 2024 in Baden-Württemberg',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Anzahl Fahrzeuge'
                        }
                    }
                },
                animation: {
                    delay: function(context) {
                        // Jeder Balken startet mit 300ms Verzögerung nach dem vorigen
                        return context.dataIndex * 300;
                    },
                    onProgress: function(animation) {
                        const chartInstance = animation.chart;
                        const ctx = chartInstance.ctx;
                        ctx.save();
                        // Schatten für 3D-Effekt während der Animation
                        ctx.shadowColor = 'rgba(0,0,0,0.1)';
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 5;
                        ctx.shadowOffsetY = 5;
                        ctx.restore();
                    }
                }
            }
        });
    }

    // Renderfunktion für Neuwagenantriebe
    function renderChartNeuwagenAntriebe() {
        if (chartNeuwagenAntriebeInstance) return; // Bereits gerendert
        
        const ctx = document.getElementById('chartNeuwagenAntriebe');
        chartNeuwagenAntriebeInstance = new Chart(ctx, {
            type: 'doughnut',
            data: dataNeuwagenAntriebe,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 13
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                const dataset = context.dataset;
                                const total = dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Neuwagenantriebe 2024',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    delay: function(context) {
                        return context.dataIndex * 300;
                    }
                }
            }
        });
    }

    // Renderfunktion für Gebrauchtwagenantriebe
    function renderChartGebrauchtwagenAntriebe() {
        if (chartGebrauchtwagenAntriebeInstance) return; // Bereits gerendert
        
        const ctx = document.getElementById('chartGebrauchtwagenAntriebe');
        chartGebrauchtwagenAntriebeInstance = new Chart(ctx, {
            type: 'pie',
            data: dataGebrauchtwagenAntriebe,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 13
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                const dataset = context.dataset;
                                const total = dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Gebrauchtwagenantriebe 2024',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
    }

    // Renderfunktion für Ausbildung
    function renderChartAusbildung() {
        if (chartAusbildungInstance) return; // Bereits gerendert
        
        const ctx = document.getElementById('chartAusbildung');
        chartAusbildungInstance = new Chart(ctx, {
            type: 'pie',
            data: dataAusbildung,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 13
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                const dataset = context.dataset;
                                const total = dataset.data.reduce((acc, data) => acc + data, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Neue Ausbildungsverträge 2024',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    delay: function(context) {
                        return context.dataIndex * 250;
                    }
                }
            }
        });
    }

    // Renderfunktion für 2025 Prognose
    function renderChart2025() {
        if (chart2025Instance) return; // Bereits gerendert
        
        const ctx = document.getElementById('chart2025');
        chart2025Instance = new Chart(ctx, {
            type: 'bar',
            data: data2025,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // Legende ausblenden
                    },
                    title: {
                        display: true,
                        text: 'Prognose Fahrzeugkäufe 2025',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Anzahl Fahrzeuge'
                        }
                    }
                },
                animation: {
                    delay: function(context) {
                        return context.dataIndex * 300;
                    },
                    onProgress: function(animation) {
                        // Helle Linie am oberen Ende des Balkens während der Animation
                        const chartInstance = animation.chart;
                        const ctx = chartInstance.ctx;
                        const meta = chartInstance.getDatasetMeta(0);
                        
                        if (animation.currentStep / animation.numSteps >= 0.9) {
                            meta.data.forEach(function(bar, index) {
                                ctx.save();
                                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                                ctx.lineWidth = 2;
                                ctx.strokeRect(bar.x - bar.width/2, bar.y, bar.width, 2);
                                ctx.restore();
                            });
                        }
                    }
                }
            }
        });
    }

    // Renderfunktion für Elektroentwicklung 2023/2024
    function renderElektroEntwicklungChart() {
        if (elektroEntwicklungChartInstance) return; // Bereits gerendert
        
        const ctx = document.getElementById('elektroEntwicklungChart');
        elektroEntwicklungChartInstance = new Chart(ctx, {
            type: 'bar',
            data: elektroEntwicklungData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Elektrofahrzeuge: Entwicklung 2023 zu 2024',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Anzahl Fahrzeuge'
                        }
                    }
                },
                animation: {
                    delay: function(context) {
                        return context.datasetIndex * 400 + context.dataIndex * 200;
                    }
                }
            }
        });
    }
    
    // Renderfunktion für Vergleich 2024/2025
    function renderComparisonChart() {
        if (comparisonChartInstance) return; // Bereits gerendert
        
        const ctx = document.getElementById('comparisonChart');
        comparisonChartInstance = new Chart(ctx, {
            type: 'bar',
            data: comparisonData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Elektromobilität: Prognose 2024 vs. 2025',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Anzahl Fahrzeuge'
                        },
                        min: 0,
                        max: 70000 // Maximale Skala festlegen, damit die Balken gut sichtbar sind
                    }
                },
                animation: {
                    delay: function(context) {
                        return context.datasetIndex * 500 + context.dataIndex * 150;
                    }
                }
            }
        });
    }

    // Scroll-Indikator hinzufügen
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    // Scroll-Indikator aktualisieren
    const updateScrollIndicator = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const width = (scrolled / documentHeight) * 100;
        scrollIndicator.style.width = `${width}%`;
    };

    // Animation für Erscheinen von Elementen beim Scrollen
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        const figures = document.querySelectorAll('.figure');
        const chartsContainers = document.querySelectorAll('.reveal-chart');
        const quoteBoxes = document.querySelectorAll('.quote-box');
        const highlightBoxes = document.querySelectorAll('.highlight-box');
        const figureBoxes = document.querySelectorAll('.figure-box');
        
        // Observer für scroll-triggered Animationen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
        
        // Elemente zum Observer hinzufügen
        sections.forEach(section => observer.observe(section));
        quoteBoxes.forEach(box => observer.observe(box));
        highlightBoxes.forEach(box => observer.observe(box));
        figures.forEach(figure => observer.observe(figure));
        figureBoxes.forEach(box => observer.observe(box));
        
        // Chart-Container mit speziellen Renderern
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Diagramm rendern, wenn Container sichtbar ist
                    const chartContainer = entry.target;
                    const chartId = chartContainer.querySelector('canvas').id;
                    
                    // Verzögerung, damit die Containeranimation zuerst abläuft
                    setTimeout(() => {
                        switch(chartId) {
                            case 'chart2024':
                                renderChart2024();
                                break;
                            case 'chartNeuwagenAntriebe':
                                renderChartNeuwagenAntriebe();
                                break;
                            case 'chartGebrauchtwagenAntriebe':
                                renderChartGebrauchtwagenAntriebe();
                                break;
                            case 'chartAusbildung':
                                renderChartAusbildung();
                                break;
                            case 'chart2025':
                                renderChart2025();
                                break;
                            case 'elektroEntwicklungChart':
                                renderElektroEntwicklungChart();
                                break;
                            case 'comparisonChart':
                                renderComparisonChart();
                                break;
                        }
                    }, 300);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
        
        chartsContainers.forEach(container => chartObserver.observe(container));
        
        // List-Items mit Verzögerung - für jede Feature-List separat
        document.querySelectorAll('.feature-list').forEach(list => {
            const listItems = list.querySelectorAll('li');
            
            const listObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Leichte Verzögerung vor Beginn der Animation (200ms)
                    setTimeout(() => {
                        listItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, index * 80); // Etwas längere Zeitintervalle zwischen den Items
                        });
                    }, 200);
                    
                    listObserver.unobserve(list);
                }
            }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
            
            listObserver.observe(list);
        });
    };

    // Zahlenanimation
    const countUp = () => {
        const counters = document.querySelectorAll('.insight-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                
                const target = +counter.innerText.replace(/\D/g, '');
                const count = +counter.getAttribute('data-count') || 0;
                const increment = target / speed;
                
                if (count < target) {
                    counter.setAttribute('data-count', Math.ceil(count + increment));
                    counter.innerText = counter.innerText.replace(/\d+/, Math.ceil(count + increment));
                    setTimeout(() => countUp(), 1);
                } else {
                    counter.innerText = counter.innerText.replace(/\d+/, target);
                }
            }
        });
    };

    // Alle Animationen aktivieren
    const runAllAnimations = () => {
        updateScrollIndicator();
        animateOnScroll();
        countUp();
    };

    // Animationen beim Laden der Seite und beim Scrollen ausführen
    runAllAnimations();
    window.addEventListener('scroll', runAllAnimations);
    window.addEventListener('resize', runAllAnimations);

    // Button-Event für den Download - entfernt, da der Download jetzt direkt über das HTML-Attribut läuft

    // Animierte Titeleffekte
    const titles = document.querySelectorAll('.animated-title');
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'none';
            setTimeout(() => {
                title.style.animation = 'highlightBorder 4s infinite';
            }, 10);
        });
    });

    // Verzögerte Chart-Initialisierung für bessere Animationseffekte
    setTimeout(() => {
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            container.classList.add('animated');
        });
    }, 1000);
});