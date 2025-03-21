const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTable');
const exportBtn = document.getElementById('exportBtn');
const categoryList = document.getElementById('categoryList');

const products = [];
const categories = new Set();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const codeInput = document.getElementById('code');
    const code = codeInput.value.trim().toUpperCase();
    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value.trim();

    if (code.length > 10) {
        alert("Codul produsului nu poate avea mai mult de 10 caractere.");
        codeInput.focus();
        return;
    }

    if (code && name && category) {
        const product = { code, name, category };
        products.push(product);
        addToTable(product);
        addCategory(category);
        form.reset();
    }
});


function addToTable(product) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
    `;
    tableBody.appendChild(row);
}

function addCategory(category) {
    if (!categories.has(category)) {
        categories.add(category);
        const option = document.createElement('option');
        option.value = category;
        categoryList.appendChild(option);
    }
}

exportBtn.addEventListener('click', function () {
    if (products.length === 0) {
        alert("Nu există produse de exportat.");
        return;
    }

    const csvHeader = "Cod produs,Denumire,Categorie\n";
    const csvRows = products.map(p => `"${p.code}","${p.name}","${p.category}"`);
    const csv = csvHeader + csvRows.join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const fileName = `nomenclator_produse_${new Date().toISOString().slice(0, 10)}.csv`;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

