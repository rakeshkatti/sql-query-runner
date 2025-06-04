export interface Dataset {
    name: string
    description: string
    columns: string[]
    data: any[]
    sampleQueries: string[]
}

export const datasets: Dataset[] = [
    {
        name: 'employees',
        description: 'Employee management data',
        columns: ['id', 'name', 'department', 'salary', 'hire_date', 'email'],
        data: [
            {
                id: 1,
                name: 'John Doe',
                department: 'Engineering',
                salary: 95000,
                hire_date: '2022-01-15',
                email: 'john.doe@company.com',
            },
            {
                id: 2,
                name: 'Jane Smith',
                department: 'Marketing',
                salary: 72000,
                hire_date: '2021-08-20',
                email: 'jane.smith@company.com',
            },
            {
                id: 3,
                name: 'Mike Johnson',
                department: 'Engineering',
                salary: 88000,
                hire_date: '2022-03-10',
                email: 'mike.johnson@company.com',
            },
            {
                id: 4,
                name: 'Sarah Wilson',
                department: 'HR',
                salary: 65000,
                hire_date: '2021-11-05',
                email: 'sarah.wilson@company.com',
            },
            {
                id: 5,
                name: 'David Brown',
                department: 'Engineering',
                salary: 102000,
                hire_date: '2020-06-18',
                email: 'david.brown@company.com',
            },
            {
                id: 6,
                name: 'Emily Davis',
                department: 'Sales',
                salary: 78000,
                hire_date: '2022-02-28',
                email: 'emily.davis@company.com',
            },
            {
                id: 7,
                name: 'Chris Martinez',
                department: 'Marketing',
                salary: 69000,
                hire_date: '2021-12-12',
                email: 'chris.martinez@company.com',
            },
            {
                id: 8,
                name: 'Lisa Anderson',
                department: 'Engineering',
                salary: 91000,
                hire_date: '2022-04-07',
                email: 'lisa.anderson@company.com',
            },
        ],
        sampleQueries: [
            "SELECT * FROM employees WHERE department = 'Engineering'",
            'SELECT name, salary FROM employees WHERE salary > 80000 ORDER BY salary DESC',
            'SELECT department, AVG(salary) as avg_salary FROM employees GROUP BY department',
        ],
    },
    {
        name: 'sales',
        description: 'Sales transaction data',
        columns: [
            'transaction_id',
            'customer_name',
            'product',
            'amount',
            'date',
            'region',
        ],
        data: [
            {
                transaction_id: 'TXN001',
                customer_name: 'Alice Cooper',
                product: 'Laptop',
                amount: 1299.99,
                date: '2024-01-15',
                region: 'North',
            },
            {
                transaction_id: 'TXN002',
                customer_name: 'Bob Miller',
                product: 'Mouse',
                amount: 29.99,
                date: '2024-01-16',
                region: 'South',
            },
            {
                transaction_id: 'TXN003',
                customer_name: 'Carol Taylor',
                product: 'Keyboard',
                amount: 89.99,
                date: '2024-01-17',
                region: 'East',
            },
            {
                transaction_id: 'TXN004',
                customer_name: 'David Clark',
                product: 'Monitor',
                amount: 399.99,
                date: '2024-01-18',
                region: 'West',
            },
            {
                transaction_id: 'TXN005',
                customer_name: 'Eve White',
                product: 'Laptop',
                amount: 1599.99,
                date: '2024-01-19',
                region: 'North',
            },
            {
                transaction_id: 'TXN006',
                customer_name: 'Frank Green',
                product: 'Tablet',
                amount: 599.99,
                date: '2024-01-20',
                region: 'South',
            },
            {
                transaction_id: 'TXN007',
                customer_name: 'Grace Hall',
                product: 'Phone',
                amount: 899.99,
                date: '2024-01-21',
                region: 'East',
            },
            {
                transaction_id: 'TXN008',
                customer_name: 'Henry Lee',
                product: 'Headphones',
                amount: 199.99,
                date: '2024-01-22',
                region: 'West',
            },
        ],
        sampleQueries: [
            'SELECT * FROM sales WHERE amount > 500 ORDER BY amount DESC',
            'SELECT region, SUM(amount) as total_sales FROM sales GROUP BY region',
            'SELECT product, COUNT(*) as sales_count FROM sales GROUP BY product ORDER BY sales_count DESC',
        ],
    },
    {
        name: 'products',
        description: 'Product inventory data',
        columns: [
            'product_id',
            'product_name',
            'category',
            'price',
            'stock_quantity',
            'supplier',
        ],
        data: [
            {
                product_id: 'P001',
                product_name: 'Gaming Laptop',
                category: 'Electronics',
                price: 1599.99,
                stock_quantity: 45,
                supplier: 'TechCorp',
            },
            {
                product_id: 'P002',
                product_name: 'Wireless Mouse',
                category: 'Accessories',
                price: 49.99,
                stock_quantity: 120,
                supplier: 'AccessTech',
            },
            {
                product_id: 'P003',
                product_name: '4K Monitor',
                category: 'Electronics',
                price: 599.99,
                stock_quantity: 32,
                supplier: 'DisplayPro',
            },
            {
                product_id: 'P004',
                product_name: 'Mechanical Keyboard',
                category: 'Accessories',
                price: 129.99,
                stock_quantity: 78,
                supplier: 'KeyMaster',
            },
            {
                product_id: 'P005',
                product_name: 'Smartphone',
                category: 'Electronics',
                price: 899.99,
                stock_quantity: 67,
                supplier: 'MobileTech',
            },
            {
                product_id: 'P006',
                product_name: 'Tablet',
                category: 'Electronics',
                price: 449.99,
                stock_quantity: 23,
                supplier: 'TabletCorp',
            },
            {
                product_id: 'P007',
                product_name: 'Webcam',
                category: 'Accessories',
                price: 89.99,
                stock_quantity: 95,
                supplier: 'CamTech',
            },
            {
                product_id: 'P008',
                product_name: 'USB Cable',
                category: 'Accessories',
                price: 19.99,
                stock_quantity: 200,
                supplier: 'CableCo',
            },
        ],
        sampleQueries: [
            'SELECT * FROM products WHERE stock_quantity < 50',
            'SELECT category, AVG(price) as avg_price FROM products GROUP BY category',
            'SELECT supplier, COUNT(*) as product_count FROM products GROUP BY supplier ORDER BY product_count DESC',
        ],
    },
]

export const getDatasetByName = (name: string): Dataset | undefined => {
    return datasets.find(dataset => dataset.name === name)
}

export const getAllDatasetNames = (): string[] => {
    return datasets.map(dataset => dataset.name)
}
