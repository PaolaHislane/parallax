document.addEventListener('DOMContentLoaded', function() {
    // Mostrar conteúdo principal quando tudo estiver carregado
    function showContent() {
        document.body.style.opacity = '1';
        document.querySelector('.main-content').style.opacity = '1';
        document.getElementById('loadingScreen').style.opacity = '0';
        document.getElementById('loadingScreen').style.pointerEvents = 'none';
        
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 800);
    }
    
    // Verificar se todas as imagens foram carregadas
    function checkImagesLoaded() {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = images.length;
        
        images.forEach(img => {
            if(img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', function() {
                    loadedCount++;
                    if(loadedCount === totalImages) {
                        showContent();
                    }
                });
            }
        });
        
        // Se todas as imagens já estiverem carregadas ou não houver imagens
        if(loadedCount === totalImages || totalImages === 0) {
            showContent();
        }
        
        // Timeout de segurança caso alguma imagem não carregue
        setTimeout(showContent, 3000);
    }
    
    // Inicia a verificação
    checkImagesLoaded();
    
    const texto = document.querySelector('.texto');
    const obras = document.querySelectorAll('.principal .obra');
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Efeito Parallax 
    document.addEventListener('scroll', function() {
        let value = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const scrollPercentage = value / (documentHeight - windowHeight);
        
        // Ajusta a posição do texto para ficar fixo no centro
        texto.style.transform = `translate(-50%, -50%)`;
        
        // Efeito parallax para cada obra de arte
        obras.forEach((obra, index) => {
            const speed = 0.2 + (index * 0.03);
            const basePosition = 5 + (index * 10);
            const newY = basePosition - (value * speed * 0.15);
            
            // Calcula a escala baseada no scroll
            const scale = 1 + (index * 0.1) - (scrollPercentage * 0.4);
            const minScale = 0.7;
            const appliedScale = Math.max(scale, minScale);
            
            // Calcula a opacidade
            const opacity = 0.9 - (scrollPercentage * 0.5);
            const minOpacity = 0.4;
            const appliedOpacity = Math.max(opacity, minOpacity);
            
            obra.style.transform = `translateY(${newY}%) scale(${appliedScale})`;
            obra.style.opacity = appliedOpacity;
            
            // Ajusta z-index para garantir ordem correta
            obra.style.zIndex = 10 + index;
        });
        
        // Efeito no header ao rolar
        if (value > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostra/oculta o botão de voltar ao topo quando o footer estiver visível
        const footer = document.querySelector('footer');
        const footerPosition = footer.getBoundingClientRect();
        const isFooterVisible = footerPosition.top < windowHeight && footerPosition.bottom >= 0;
        
        if (isFooterVisible || value + windowHeight >= documentHeight - 100) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll suave para links
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botão voltar ao topo
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Força disparo do evento scroll
    window.dispatchEvent(new Event('scroll'));
});