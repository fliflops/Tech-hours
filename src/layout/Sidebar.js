import React from 'react';
import {Drawer,
	List,
	ListItem,
	ListItemText,
	Collapse ,
	Typography,
	Divider
} from '@mui/material';
import {ExpandLess,ExpandMore} from '@mui/icons-material';
import {NavLink,useLocation} from 'react-router-dom';
import {modules as Modules} from '../assets';

function Sidebar({isOpen,toggle}) {
    const [modules,setModules] = React.useState(Modules.map(item => {
		return {
			isCollapse:false,
			...item
		}
	}));

    const location = useLocation();

	const toggleSubmodule = (index) => {
		let temp = [...modules];
		let selected = {...temp[index]}
		selected.isCollapse = !selected.isCollapse
		temp[index] = selected
		setModules(temp);
	}


    return (
		<div>
			<Drawer anchor='left' open={isOpen} onClose={toggle}>
				<div style={{width:290}}>
					<List>
					{
						modules.map((item,index) => {
							return <div key={index}>
								{
									item.subModules.length > 0 ?
									<ListItem button variant='drawerItem' onClick={() => toggleSubmodule(index)}>
										<ListItemText
											disableTypography
											primary={<Typography variant="button">{item.label}</Typography>}
										/>
										<div>
											{item.isCollapse ? <ExpandLess htmlColor='#FF6400'/> :<ExpandMore htmlColor='#FF6400'/>}
										</div>
									</ListItem> :
									<ListItem button
										onClick={toggle}
										component={NavLink}
										selected = {location.pathname === item.route}
										to={{
											pathname:item.route,
												state:{
													header:item.label,
													subHeader:''
												}
											}}
										>
										<ListItemText
											disableTypography
											primary={<Typography variant='overline'>{item.label}</Typography>}
										/>
									</ListItem>
								}

								<Collapse in={item.isCollapse} timeout="auto" unmountOnExit>
									{
										item.subModules.map((sub,i) => {
											return <ListItem 
												variant='drawerSubItem'
												button 
												onClick={toggle}
												component={NavLink}
												selected = {location.pathname === sub.route}
												to={{
													pathname:sub.route,
													state:{
														header:item.label,
														subHeader:sub.label
													}
												}}
												key={i}>
												<ListItemText
													disableTypography
													primary={<Typography sx={{padding:2}} variant='overline'>{sub.label}</Typography>}
												/>
											</ListItem>
										})
									}
								</Collapse>
								<Divider/>
							</div>
						})
					}
					</List>
				</div>
			</Drawer>
		</div>
	);
}

export default Sidebar