import React, { useMemo, useState } from 'react';
import { Eye, Pencil, Trash, Check, House, Link } from 'phosphor-react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import DataTable from '../../../components/common/DataTable';
import styles from './PropertiesDataTable.module.css';

const PropertiesDataTable = ({ data = [], onRowClick, onEdit, onDelete, onView }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={table.getIsAllPageRowsSelected()}
                            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
                            className={styles.checkbox}
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={row.getIsSelected()}
                            onChange={(e) => row.toggleSelected(e.target.checked)}
                            className={styles.checkbox}
                        />
                    </div>
                ),
            },
            {
                accessorKey: 'image',
                header: 'FOTO',
                cell: ({ getValue, row }) => {
                    const image = getValue();
                    const address = row.original.address;
                    const initials = address ? address.split(' ').map(word => word[0]).join('').slice(0, 2) : 'PR';

                    return (
                        <div className={styles.imageCell}>
                            {image ? (
                                <img src={image} alt="Propiedad" className={styles.propertyImage} />
                            ) : (
                                <div className={styles.imagePlaceholder}>
                                    {initials}
                                </div>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'address',
                header: 'DIRECCIÓN',
                cell: ({ getValue, row }) => {
                    const address = getValue();
                    const city = row.original.city;
                    const code = row.original.code;

                    return (
                        <div className={styles.addressCell}>
                            <div className={styles.addressText}>{address}</div>
                            {code && <div className={styles.codeTag}>{code}</div>}
                            {city && <div className={styles.cityText}>{city}</div>}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'quality',
                header: 'CALIDAD',
                cell: ({ getValue }) => {
                    const quality = getValue();
                    const percentage = Math.min(Math.max(quality, 0), 100);

                    return (
                        <div className={styles.qualityCell}>
                            <div className={styles.circularProgress}>
                                <svg className={styles.circularChart} viewBox="0 0 36 36">
                                    <path
                                        className={styles.circleBackground}
                                        d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={styles.circleProgress}
                                        strokeDasharray={`${percentage}, 100`}
                                        d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className={styles.qualityText}>{quality}%</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'type',
                header: 'TIPO',
                cell: ({ getValue, row }) => {
                    const type = getValue();
                    const category = row.original.category;

                    return (
                        <div className={styles.typeCell}>
                            <div className={styles.typeText}>{type}</div>
                            {category && <div className={styles.categoryText}>{category}</div>}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'price',
                header: 'PRECIO',
                cell: ({ getValue, row }) => {
                    const price = getValue();
                    const currency = row.original.currency || '$';

                    return (
                        <div className={styles.priceCell}>
                            <div className={styles.priceType}>Venta</div>
                            <div className={styles.priceText}>
                                {currency} {price?.toLocaleString()}
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'portals',
                header: 'PORTALES',
                cell: ({ getValue }) => {
                    const portals = getValue();

                    return (
                        <div className={styles.portalsCell}>
                            {Array.isArray(portals) ? (
                                portals.map((portal, index) => (
                                    <div key={index} className={styles.portalItem}>
                                        <span className={styles.portalTag}>{portal}</span>
                                        <div className={styles.portalIcons}>
                                            <House size={16} className={styles.portalIcon} />
                                            <Link size={16} className={styles.portalIcon} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.portalItem}>
                                    <span className={styles.portalTag}>{portals}</span>
                                    <div className={styles.portalIcons}>
                                        <House size={16} className={styles.portalIcon} />
                                        <Link size={16} className={styles.portalIcon} />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                },
            },
        ],
        [onView, onEdit, onDelete]
    );

    return (
        <DataTable
            data={data}
            columns={columns}
            onRowClick={onRowClick}
            showPagination={true}
            pageSize={10}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
        />
    );
};

export default PropertiesDataTable;
