import Form from '../../components/Common/Form';
function Category() {
    const fields = [
        {
            name: 'category_name',
            label: 'Category Name',
            type: 'text',
            validation: { required: 'Category Name is required' },
        },
        {
            name: 'category_image',
            label: 'Category Image',
            type: 'file',
            validation: { required: 'Category image is required' },
        },
    ];

    const handleSubmit = (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (data[key] instanceof FileList) {
                    if (data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
        } catch (error) {}
    };

    return (
        <>
            <div>
                <Form fields={fields} onSubmit={handleSubmit} />
            </div>
            <div>Category</div>;
        </>
    );
}

export default Category;
